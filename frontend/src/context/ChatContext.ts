import { createContext } from 'react';
import { TMessage } from '../types/messages';
import { TUser } from '../types/user';

export const initMessagesParams = {
  messages: [],
  setMessage() {},
};

export const initUserParams = {
  user: {
    id: '',
    email: '',
    nickname: '',
    room: '',
  },
  setUser() {},
};

export interface IChatContext {
  user: TUser;
  messages: TMessage[];
  setUser: (params: TUser) => void;
  setMessage: (id: number) => void;
}

const ChatContext = createContext<IChatContext>({
  ...initUserParams,
  ...initMessagesParams,
});
export default ChatContext;
