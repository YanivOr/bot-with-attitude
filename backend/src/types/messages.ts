// export type TMessageType = 'Q' | 'A' | 'B';

export type TMessage = {
  type: string; // TMessageType;
  ref?: string;
  email: string;
  nickname: string;
  message: string;
};
