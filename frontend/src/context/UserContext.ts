import { createContext } from 'react';
import { TUser, initUser } from '../types/user';

export interface IUserContext {
  user: TUser;
  setUser: (params: TUser) => void;
}

const UserContext = createContext<IUserContext>({
  user: initUser,
  setUser() {},
});
export default UserContext;
