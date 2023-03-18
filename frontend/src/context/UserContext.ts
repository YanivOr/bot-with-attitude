import { createContext } from 'react';
import { TUser } from '../types/user';

export const initUserParams = {
  email: '',
  nickname: '',
  room: '',
};

export interface IUserContext {
  user: TUser;
  setUser: (params: TUser) => void;
}

const UserContext = createContext<IUserContext>({
  user: initUserParams,
  setUser() {},
});
export default UserContext;
