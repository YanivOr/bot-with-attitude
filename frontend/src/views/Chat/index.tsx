import { useState } from 'react';
import './Chat.scss';

const Chat = ({ sendClicked }: { sendClicked: (message: string) => void }) => {
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
      <div>
        <button onClick={() => sendClicked(message)}>SEND</button>
      </div>
    </div>
  );
};

export default Chat;
