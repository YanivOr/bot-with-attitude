import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext, { initUserParams } from './context/UserContext';
import { TUser } from './types/user';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import './App.scss';

const App = () => {
  const [user, setUser] = useState<TUser>(initUserParams);

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
