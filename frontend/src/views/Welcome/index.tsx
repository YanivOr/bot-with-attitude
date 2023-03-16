import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Welcome.scss';

const Welcome = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState('yaniv.or.78@gmail.com');
  const [nickname, setNickname] = useState('YanivOr');

  return (
    <div className='Welcome'>
      <h1>Welcome</h1>
      <input
        type='text'
        placeholder='enter email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type='text'
        placeholder='enter nickname'
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      />
      <button
        onClick={() => {
          nav('/chat');
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Welcome;
