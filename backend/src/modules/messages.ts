import { esClient } from '../app';
import { TMessage } from '../types/messages';

const NUM_RESULTS = 1000;

export const fetchAllMessages = async (room: string) => {
  try {
    const result = await esClient.search({
      index: room,
      size: NUM_RESULTS,
      sort: [{ timestamp: 'asc' }],
      query: {
        match_all: {},
      },
    });

    return result.hits.hits;
  } catch (error) {
    console.log(error);
    // TODO: error handling
  }
};

export const fetchMessageById = async (room: string, _id: string) => {
  try {
    const result = await esClient.search({
      index: room,
      query: {
        terms: {
          _id: [_id],
        },
      },
    });

    return result.hits.hits;
  } catch (error) {
    console.log(error);
    // TODO: error handling
  }
};

export const addMessage = async (
  room: string,
  { type, ref, email, nickname, message, timestamp }: TMessage
) => {
  try {
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
  } catch (error) {
    console.log(error);
    // TODO: error handling
  }
};

export const updateMessage = async (room: string, _id: string, params: any) => {
  try {
    const indexedMessage = await esClient.update({
      index: room,
      id: _id,
      body: {
        doc: params,
      },
    });

    await esClient.indices.refresh({ index: room });

    return indexedMessage;
  } catch (error) {
    console.log(error);
    // TODO: error handling
  }
};

export const searchMatches = async (
  room: string,
  phrase: string,
  minimumMatch: number
) => {
  try {
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
  } catch (error) {
    console.log(error);
    // TODO: error handling
  }
};
