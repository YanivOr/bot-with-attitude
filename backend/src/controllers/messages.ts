import { esClient } from '../app';
import { TMessage } from '../types/messages';

export const addMessage = async (
  room: string,
  { email, nickname, message }: TMessage
) => {
  const indexedMessage = await esClient.index({
    index: room,
    document: {
      email,
      nickname,
      message,
    },
  });

  await esClient.indices.refresh({ index: room });

  return indexedMessage;
};

export const fetchAllMessages = async (room: string) => {
  const result = await esClient.search({
    index: room,
    query: {
      match_all: {},
      // match: { message: 'pop' },
    },
  });

  return result.hits.hits;
};
