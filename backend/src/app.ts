import { config as dotenvConfig } from 'dotenv';
import express, {
  Application /*, NextFunction, Request, Response*/,
} from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import queryString from 'querystring';
import { allUsers, addUser, delUser } from './controllers/user';

dotenvConfig();

const app: Application = express();

/*
const envPortRest = parseInt(process.env.PORT_REST || '');
const PORT_REST = Number.isInteger(envPortRest) ? envPortRest : 8000;
*/

const envPortWs = parseInt(process.env.PORT_WS || '');
const PORT_WS = Number.isInteger(envPortWs) ? envPortWs : 3000;

const wss: WebSocketServer = new WebSocketServer({ port: PORT_WS });

const esClient = new ElasticsearchClient({
  node: process.env.ES_ENDPOINT,
});

/*
app.listen(PORT_REST, () => {
  console.log(`Server is listening on port ${PORT_REST}`);
});
*/

wss.on('connection', (ws, req) => {
  const socketId = req.headers['sec-websocket-key'];
  const qsParams = queryString.parse((req.url || '').replace(/^.*\?/, ''));

  if (!socketId || !qsParams.email || !qsParams.nickname || !qsParams.room)
    return;

  addUser(socketId, {
    email: qsParams.email?.toString() || '',
    nickname: qsParams.nickname?.toString() || '',
    room: qsParams.room?.toString() || '',
  });

  ws.on('close', (ws, req) => {
    delUser(socketId);
  });

  /*
  ws.on('message', (data) => {
    console.log('received: %s', data);
  });

  ws.send('something');
  */

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

//async function run() {
/*
  await esClient.index({
    index: 'game-of-thrones',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.',
    },
  });

  await esClient.index({
    index: 'game-of-thrones',
    document: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.',
    },
  });

  await esClient.index({
    index: 'game-of-thrones',
    document: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.',
    },
  });
  */
// await esClient.indices.refresh({ index: 'game-of-thrones' });
/*
  const result = await esClient.search({
    index: 'game-of-thrones',
    query: {
      match: { quote: 'sword' },
    },
  });


  console.log(result.hits.hits);
  */
//}

// run().catch(console.log);
