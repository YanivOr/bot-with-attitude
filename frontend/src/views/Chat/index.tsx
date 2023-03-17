import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import ChatContext from '../../context/ChatContext';
import { TUser } from '../../types/user';
import './Chat.scss';

const Chat = () => {
  const WS_URL = 'ws://127.0.0.1:3000';

  const nav = useNavigate();

  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [message, setMessage] = useState<string>('');
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
        }
      } catch (err) {
        console.log(err);
      }
    },
    shouldReconnect: () => true,
    queryParams: user,
  });

  if (!user.email || !user.nickname || !user.room) nav('/welcome');

  return (
    <div className='Chat'>
      <div className='users'>
        {allUsers.map(({ nickname }) => (
          <span className='user'>{nickname}</span>
        ))}
      </div>
      <div className='main'></div>
      <input
        className='message'
        type='text'
        placeholder='Message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <div>
        <button
          onClick={() => {
            sendMessage(message);
            setMessage('');
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Chat;
