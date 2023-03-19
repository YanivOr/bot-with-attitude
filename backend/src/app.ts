import { config as dotenvConfig } from 'dotenv';
import express, { Application } from 'express';
import { WebSocketServer } from 'ws';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import { initBot } from './controllers/user';
import { initWebSockets } from './handlers/web-sockets';

dotenvConfig();

const app: Application = express();

export const esClient = new ElasticsearchClient({
  node: process.env.ES_ENDPOINT,
});

const envPortWs = parseInt(process.env.PORT_WS || '');
const PORT_WS = Number.isInteger(envPortWs) ? envPortWs : 3000;

export const wss: WebSocketServer = new WebSocketServer({ port: PORT_WS });

/*
const envPortRest = parseInt(process.env.PORT_REST || '');
const PORT_REST = Number.isInteger(envPortRest) ? envPortRest : 8000;

app.listen(PORT_REST, () => {
  console.log(`Server is listening on port ${PORT_REST}`);
});
*/

initBot();
initWebSockets();
