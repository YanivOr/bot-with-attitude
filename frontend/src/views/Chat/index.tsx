import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import ChatContext from '../../context/ChatContext';
import { TUser } from '../../types/user';
import { TMessage } from '../../types/messages';
import Bot from '../../components/Bot';
import './Chat.scss';

const Chat = () => {
  const WS_URL = 'ws://127.0.0.1:3000';

  const nav = useNavigate();

  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [allMessages, setAllMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [botParams, setBotParams] = useState<{} | null>(null);

  const { user } = useContext(ChatContext);

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (msg) => {
      try {
        const { type, data } = JSON.parse(msg.data);

        switch (type) {
          case 'allUsers':
            setAllUsers(Object.values(data));
            break;
          case 'allMessages':
            setAllMessages(data);
            break;
          case 'newMessage':
            if (data._source.nickname === 'BWA') {
              setBotParams({});
            }

            setAllMessages([...allMessages, data]);
            break;
        }
      } catch (err) {
        console.log(err);
      }
    },
    shouldReconnect: () => true,
    queryParams: user,
  });

  const sendButtonClicked = () => {
    if (!message) return;
    sendMessage(message);
    setMessage('');
  };

  if (!user.email || !user.nickname || !user.room) nav('/welcome');

  return (
    <div className='Chat'>
      <div className='users-main'>
        <div className='users'>
          {allUsers.map(({ email, nickname }) => (
            <span className='user' key={email}>
              {nickname}
            </span>
          ))}
        </div>
        <div className='main'>
          {allMessages.map(({ _id, _source: { nickname, message } }) => (
            <div className='msg' key={_id}>
              <div>{nickname}</div>
              {message}
            </div>
          ))}
        </div>
      </div>
      <div className='message-send'>
        <input
          className='message'
          type='text'
          placeholder='Message'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendButtonClicked}>SEND</button>
      </div>
      {botParams && <Bot />}
    </div>
  );
};

export default Chat;
