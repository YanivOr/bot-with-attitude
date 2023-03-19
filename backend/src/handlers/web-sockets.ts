import { OPEN } from 'ws';
import { wss } from '../app';
import {
  fetchAllMessages,
  fetchMessageById,
  fetchMessageByRef,
  addMessage,
  searchMatches,
} from '../controllers/messages';
import { allUsers, addUser, delUser } from '../controllers/user';
import { parseQueryString } from './general';
import { wordsToFilter } from '../data';
import { TMessage } from '../types/messages';

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
      broadcastMessage(indexedMessage._id, {
        type,
        ref,
        email,
        nickname,
        message,
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

        // Broadcast bot message
        broadcastMessage(indexedMessage._id, {
          type: typeBot,
          ref: refBot,
          email: emailBot,
          nickname: nicknameBot,
          message: messageBot,
        });
      }
    });

    // Broadcast updated users list
    broadcastUsersList();
  });
};
