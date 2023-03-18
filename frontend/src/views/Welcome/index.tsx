import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import './Welcome.scss';

const Welcome = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState<string>('yaniv.or.78@gmail.com');
  const [nickname, setNickname] = useState<string>('YanivOr');

  const { setUser } = useContext(UserContext);

  return (
    <div className='Welcome'>
      <h1>Welcome</h1>
      <div className='form'>
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
            setUser({
              email,
              nickname,
              room: 'main-room',
            });
            nav('/chat');
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Welcome;
