enum MessageType {
  Q = 'Q',
  A = 'A',
  B = 'B',
  N = 'N',
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
  _id: 'bot-1st-msg',
  _source: {
    type: MessageType.N,
    email: 'bot@bot',
    nickname: 'BWA',
    message:
      "Hi, I Am your Chatbot. I can help you find answers already asked on this chat room.<br /><b>Trust me, i'm a robot.<b>",
  },
};
