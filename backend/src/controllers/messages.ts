import { esClient } from '../app';
import { TMessage } from '../types/messages';

export const fetchAllMessages = async (room: string) => {
  const result = await esClient.search({
    index: room,
    size: 1000,
    query: {
      match_all: {},
    },
  });

  return result.hits.hits;
};

export const fetchMessageById = async (room: string, _id: string) => {
  const result = await esClient.search({
    index: room,
    query: {
      terms: {
        _id: [_id],
      },
    },
  });

  return result.hits.hits;
};

export const fetchMessageByRef = async (room: string, _id: string) => {
  const result = await esClient.search({
    index: room,
    query: {
      match: {
        ref: {
          query: _id,
        },
      },
    },
  });

  return result.hits.hits;
};

export const addMessage = async (
  room: string,
  { type, ref, email, nickname, message }: TMessage
) => {
  const indexedMessage = await esClient.index({
    index: room,
    document: {
      type,
      ref,
      email,
      nickname,
      message,
    },
  });

  await esClient.indices.refresh({ index: room });

  return indexedMessage;
};

export const searchMatches = async (
  room: string,
  phrase: string,
  minimumMatch: number
) => {
  const result = await esClient.search({
    index: room,
    query: {
      match: {
        message: {
          query: phrase,
          minimum_should_match: minimumMatch,
          fuzziness: 1,
        },
      },
    },
  });

  return result.hits.hits;
};
