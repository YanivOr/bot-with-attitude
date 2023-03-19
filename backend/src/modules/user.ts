import { TUser } from '../types/user';

export const allUsers = new Map();

export const botParams = {
  email: 'bot@bot',
  nickname: 'BWA',
};

export const addUser = (socketId: string, params: TUser) => {
  allUsers.set(socketId, params);
};

export const delUser = (socketId: string) => {
  allUsers.delete(socketId);
};

export const initBot = () => {
  addUser('bot-socket', {
    email: botParams.email,
    nickname: botParams.nickname,
    room: 'main-room',
  });
};
