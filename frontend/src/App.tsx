import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChatContext, { initUserParams } from './context/ChatContext';
import { TUser } from './types/user';
import { TMessage } from './types/messages';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import './App.scss';

const App = () => {
  const [user, setUser] = useState<TUser>(initUserParams);
  // const [messages, setMessages] = useState<TMessage[]>([]);

  return (
    <div className='App'>
      <ChatContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<Navigate to='/welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </ChatContext.Provider>
    </div>
  );
};

export default App;
