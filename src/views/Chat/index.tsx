import { useState } from 'react';
import './Chat.scss';

const Chat = () => {
  const [message, setMessage] = useState('');

  return (
    <div className='Chat'>
      <div className='main'></div>
      <input
        className='message'
        type='text'
        placeholder='Message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
    </div>
  );
};

export default Chat;
