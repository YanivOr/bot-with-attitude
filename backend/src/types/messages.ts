/*
enum MessageType {
  Q,
  A,
  B,
}
*/

export type TMessage = {
  type: string; // MessageType;
  ref?: string;
  email: string;
  nickname: string;
  message: string;
};
