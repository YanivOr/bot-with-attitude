import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import { TUser, initUser } from './types/user';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import './App.scss';

export const WS_URL = 'ws://127.0.0.1:3000';

const App = () => {
  const [user, setUser] = useState<TUser>(initUser);

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<Navigate to='/welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
