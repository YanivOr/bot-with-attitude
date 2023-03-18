enum MessageType {
  Q = 'Q',
  A = 'A',
  B = 'B',
}

export type TMessage = {
  _id: string;
  _source: {
    type: MessageType;
    ref?: string;
    email: string;
    nickname: string;
    message: string;
  };
};

export const initMessage = {
  _id: '',
  _source: {
    type: MessageType.Q,
    email: '',
    nickname: '',
    message: '',
  },
};
