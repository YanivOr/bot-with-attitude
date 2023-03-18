export type TMessageType = 'Q' | 'A';

export type TMessage = {
  _id: string;
  _source: {
    type: TMessageType;
    email: string;
    nickname: string;
    message: string;
  };
};
