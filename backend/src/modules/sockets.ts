import { OPEN } from 'ws';
import { wss } from '../app';
import {
  fetchAllMessages,
  fetchMessageById,
  addMessage,
  updateMessage,
  searchMatches,
} from './messages';
import { allUsers, addUser, delUser, botParams } from './user';
import { parseQueryString } from '../helpers/general';
import { wordsToFilter } from '../data';
import { MessageType, TMessage } from '../types/messages';

const broadcastMessage = (_id: string, params: TMessage) => {
  const { type, ref, email, nickname, message } = params;

  wss.clients.forEach((client) => {
    if (client.readyState === OPEN) {
      client.send(
        JSON.stringify({
          type: 'newMessage',
          data: {
            _id,
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
};

const broadcastUsersList = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === OPEN) {
      client.send(
        JSON.stringify({
          type: 'allUsers',
          data: Object.fromEntries(allUsers),
        })
      );
    }
  });
};

export const initWebSockets = () => {
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

    const allMessages = await fetchAllMessages(room);

    if (allMessages) {
      ws.send(
        JSON.stringify({
          type: 'allMessages',
          data: allMessages.reverse(),
        })
      );
    }

    ws.on('close', (ws, req) => {
      delUser(socketId);
    });

    ws.on('message', async (data) => {
      const { type, ref, message } = JSON.parse(data.toString());

      const timestamp = Date.now();

      let refMessage;

      if (ref) {
        const refQuestions: any = await fetchMessageById(room, ref);
        const refQuestion = refQuestions[0];

        if (refQuestion) {
          refMessage = JSON.stringify({
            q: {
              nickname: refQuestion._source.nickname,
              message: refQuestion._source.message,
            },
            a: {
              nickname: nickname,
              message: message,
            },
          });
        }
      }

      const indexedMessage = await addMessage(room, {
        type,
        ref,
        email,
        nickname,
        message: refMessage || message,
        timestamp,
      });

      if (!indexedMessage) return;

      // Broadcast new message
      broadcastMessage(indexedMessage._id, {
        type,
        ref,
        email,
        nickname,
        message: refMessage || message,
        timestamp,
      });

      if (ref) {
        await updateMessage(room, ref, {
          ref: indexedMessage._id,
        });
      }

      // Check message and answer with bot
      if (type === 'Q') {
        let relevantTerms: string[] = [];
        let matchedAnswer: any;
        let parsedMessage: any;

        const cleanedMessage = message.replace(/[\W_]+/g, ' ');
        let splittedMessage = cleanedMessage.split(' ');

        splittedMessage.forEach((phrase: string) => {
          if (phrase && !wordsToFilter.includes(phrase.toLowerCase()))
            relevantTerms = [...relevantTerms, phrase];
        });

        const phrase = relevantTerms.join(' ');
        const minimumMatch = relevantTerms.length - 1;

        const matches = await searchMatches(room, phrase, minimumMatch);
        if (!matches || !matches.length) return;

        matches.forEach((match: any) => {
          if (match._source.ref) {
            matchedAnswer = match;
            return;
          }
        });

        if (!matchedAnswer) return;

        const typeBot = MessageType.B;
        const refBot = '';
        const emailBot = botParams.email;
        const nicknameBot = botParams.nickname;
        const messageBot = matchedAnswer._source.message;
        const timestampBot = Date.now();

        const indexedMessage = await addMessage(room, {
          type: typeBot,
          ref: refBot,
          email: emailBot,
          nickname: nicknameBot,
          message: messageBot,
          timestamp: timestampBot,
        });

        if (!indexedMessage) return;

        // Broadcast bot message
        broadcastMessage(indexedMessage._id, {
          type: typeBot,
          ref: refBot,
          email: emailBot,
          nickname: nicknameBot,
          message: messageBot,
          timestamp: timestampBot,
        });
      }
    });

    // Broadcast updated users list
    broadcastUsersList();
  });
};
