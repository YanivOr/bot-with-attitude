import { config as dotenvConfig } from 'dotenv';
import express, {
  Application /*, NextFunction, Request, Response*/,
} from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import queryString from 'querystring';
import { allUsers, addUser, delUser } from './controllers/user';
import { addMessage, fetchAllMessages } from './controllers/messages';

dotenvConfig();

const app: Application = express();

/*
const envPortRest = parseInt(process.env.PORT_REST || '');
const PORT_REST = Number.isInteger(envPortRest) ? envPortRest : 8000;
*/

const envPortWs = parseInt(process.env.PORT_WS || '');
const PORT_WS = Number.isInteger(envPortWs) ? envPortWs : 3000;

const wss: WebSocketServer = new WebSocketServer({ port: PORT_WS });

export const esClient = new ElasticsearchClient({
  node: process.env.ES_ENDPOINT,
});

/*
app.listen(PORT_REST, () => {
  console.log(`Server is listening on port ${PORT_REST}`);
});
*/

const parseQueryString = (qs: string) => {
  return queryString.parse(qs.replace(/^.*\?/, ''));
};

wss.on('connection', async (ws, req) => {
  const socketId = req.headers['sec-websocket-key'];
  const qsParams = parseQueryString(req.url || '');

  const email = qsParams.email?.toString() || '';
  const nickname = qsParams.nickname?.toString() || '';
  const room = qsParams.room?.toString() || '';

  if (!socketId || !email || !nickname || !room) return;

  addUser(socketId, {
    email,
    nickname,
    room,
  });

  try {
    const allMessages = await fetchAllMessages(room);

    ws.send(
      JSON.stringify({
        type: 'allMessages',
        data: allMessages,
      })
    );
  } catch (error) {
    console.log(error);
  }

  ws.on('close', (ws, req) => {
    delUser(socketId);
  });

  ws.on('message', async (data) => {
    const message = data.toString();

    const indexedMessage = await addMessage(room, {
      email,
      nickname,
      message,
    });

    // Broadcast new message
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'newMessage',
            data: {
              _id: indexedMessage._id,
              _source: {
                email,
                nickname,
                message,
              },
            },
          })
        );
      }
    });

    // Check message and answer with bot
    if (message === 'hello bot') {
      const emailBot = 'bot@bot';
      const nicknameBot = 'BWT';
      const messageBot = 'Answer from BWT';

      const indexedMessage = await addMessage(room, {
        email: emailBot,
        nickname: nicknameBot,
        message: messageBot,
      });

      // Broadcast new message
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: 'newMessage',
              data: {
                _id: indexedMessage._id,
                _source: {
                  email: emailBot,
                  nickname: nicknameBot,
                  message: messageBot,
                },
              },
            })
          );
        }
      });
    }
  });

  // Broadcast updated users list
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: 'allUsers',
          data: Object.fromEntries(allUsers),
        })
      );
    }
  });
});

// Add bot
addUser('bot-socket', {
  email: 'bot@bot',
  nickname: 'BWT',
  room: 'main-room',
});
