export enum MessageType {
  Q = 'Q',
  A = 'A',
  B = 'B',
  N = 'N',
}

export type TMessage = {
  type: MessageType;
  ref?: string;
  email: string;
  nickname: string;
  message: string;
};
