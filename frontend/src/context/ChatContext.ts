import { createContext } from 'react';
import { TMessage } from '../types/messages';
import { TUser } from '../types/user';

export const initUserParams = {
  email: '',
  nickname: '',
  room: '',
};

export interface IChatContext {
  user: TUser;
  // messages: TMessage[];
  setUser: (params: TUser) => void;
  // setMessages: (params: TMessage) => void;
}

const ChatContext = createContext<IChatContext>({
  user: initUserParams,
  setUser() {},
  // messages: [],
  // setMessages() {},
});
export default ChatContext;
