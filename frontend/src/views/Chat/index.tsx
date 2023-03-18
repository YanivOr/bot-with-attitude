import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
// import { delay } from '../../helpers';
import UserContext from '../../context/UserContext';
import { TUser } from '../../types/user';
import { TMessage } from '../../types/messages';
import Bot from '../../components/Bot';
import './Chat.scss';

const Chat = () => {
  const WS_URL = 'ws://127.0.0.1:3000';

  const nav = useNavigate();

  const [displayBot, setDisplayBot] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [allMessages, setAllMessages] = useState<TMessage[]>([]);

  const [type, setType] = useState<string>('Q');
  const [ref, setRef] = useState<TMessage | null>(null);
  const [message, setMessage] = useState<string>('');

  const { user } = useContext(UserContext);

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: async (msg) => {
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
              setDisplayBot(true);
            }

            setAllMessages([data, ...allMessages]);
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

    sendMessage(
      JSON.stringify({
        type,
        ref: ref?._id,
        message,
      })
    );

    setMessage('');
    setType('Q');
    setRef(null);
  };

  const msgClicked = (_id: string) => {
    const filteredMessage = allMessages.filter(
      (message) => message._id === _id
    );
    const refMessage = filteredMessage[0];

    setType('A');
    setRef(refMessage);
  };

  if (!user.email || !user.nickname || !user.room) nav('/welcome');

  return (
    <div className='Chat'>
      <div className='users-main'>
        <div className='users'>
          {allUsers.map(({ email, nickname }) => (
            <div className='user' key={email}>
              {nickname}
            </div>
          ))}
        </div>
        <div className='main'>
          {allMessages.map(({ _id, _source: { type, nickname, message } }) => (
            <div
              className={`msg-holder ${
                user.nickname === nickname ? 'mine' : 'msg-holder'
              }`}
              key={_id}
            >
              <div
                className='msg'
                onClick={() => type === 'Q' && msgClicked(_id)}
              >
                <div className='user'>{nickname}</div>
                <span>{message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {ref && (
        <div className='msg-holder'>
          <div className='msg ref'>
            <div className='user'>{ref._source.nickname}</div>
            <span>{ref._source.message}</span>
          </div>
          <div
            className='close-ref'
            onClick={() => {
              setType('Q');
              setRef(null);
            }}
          ></div>
        </div>
      )}
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
      {displayBot && <Bot hideBot={() => setDisplayBot(false)} />}
    </div>
  );
};

export default Chat;
