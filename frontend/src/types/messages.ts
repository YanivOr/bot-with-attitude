export type TMessage = {
  _id: string;
  _source: {
    email: string;
    nickname: string;
    message: string;
  };
};
