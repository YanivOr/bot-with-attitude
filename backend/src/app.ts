import { config as dotenvConfig } from 'dotenv';
import express, {
  Application /*, NextFunction, Request, Response*/,
} from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import queryString from 'querystring';
import { allUsers, addUser, delUser } from './controllers/user';
import {
  fetchAllMessages,
  fetchMessageById,
  fetchMessageByRef,
  addMessage,
  searchMatches,
} from './controllers/messages';
import { wordsToFilter } from './data';

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
        data: allMessages.reverse(),
      })
    );
  } catch (error) {
    console.log(error);
  }

  ws.on('close', (ws, req) => {
    delUser(socketId);
  });

  ws.on('message', async (data) => {
    const { type, ref, message } = JSON.parse(data.toString());

    const indexedMessage = await addMessage(room, {
      type,
      ref,
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
                type,
                ref,
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
    if (type === 'Q') {
      let relevantTerms: string[] = [];

      const cleanedMessage = message.replace(/[\W_]+/g, ' ');
      let splittedMessage = cleanedMessage.split(' ');

      splittedMessage.forEach((phrase: string) => {
        if (phrase && !wordsToFilter.includes(phrase.toLowerCase()))
          relevantTerms = [...relevantTerms, phrase];
      });

      const phrase = relevantTerms.join(' ');
      const minimumMatch = relevantTerms.length - 1;

      const matches = await searchMatches(room, phrase, minimumMatch);
      if (!matches.length) return;

      const matchedQuestions = await fetchMessageById(room, matches[0]._id);
      if (!matchedQuestions.length) return;
      const matchedQuestion: any = matchedQuestions[0];

      const matchedAnswers = await fetchMessageByRef(room, matches[0]._id);
      if (!matchedAnswers.length) return;
      const matchedAnswer: any = matchedAnswers[0];

      const typeBot = 'B';
      const refBot = '';
      const emailBot = 'bot@bot';
      const nicknameBot = 'BWA';
      const messageBot = JSON.stringify({
        q: {
          nickname: matchedQuestion._source.nickname,
          message: matchedQuestion._source.message,
        },
        a: {
          nickname: matchedAnswer._source.nickname,
          message: matchedAnswer._source.message,
        },
      });

      const indexedMessage = await addMessage(room, {
        type: typeBot,
        ref: refBot,
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
                  type: typeBot,
                  ref: refBot,
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
  nickname: 'BWA',
  room: 'main-room',
});
