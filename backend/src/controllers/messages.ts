import { esClient } from '../app';
import { TMessage } from '../types/messages';

const NUM_RESULTS = 1000;

export const fetchAllMessages = async (room: string) => {
  const result = await esClient.search({
    index: room,
    size: NUM_RESULTS,
    sort: [{ timestamp: 'asc' }],
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

export const addMessage = async (
  room: string,
  { type, ref, email, nickname, message, timestamp }: TMessage
) => {
  const indexedMessage = await esClient.index({
    index: room,
    document: {
      type,
      ref,
      email,
      nickname,
      message,
      timestamp,
    },
  });

  await esClient.indices.refresh({ index: room });

  return indexedMessage;
};

export const updateMessage = async (room: string, _id: string, params: any) => {
  const indexedMessage = await esClient.update({
    index: room,
    id: _id,
    body: {
      doc: params,
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
    size: NUM_RESULTS,
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
