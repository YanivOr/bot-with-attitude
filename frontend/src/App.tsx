import { Routes, Route, Navigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import ChatContext, {
  initUserParams,
  initMessagesParams,
} from './context/ChatContext';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import './App.scss';

const App = () => {
  const WS_URL = 'ws://127.0.0.1:3000';

  /*
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    shouldReconnect: (closeEvent) => true,
    queryParams: { test111: 'test111', test222: 'test222' },
  });
  */

  const sendClicked = (message: string) => {
    // sendMessage(message);
  };

  return (
    <div className='App'>
      <ChatContext.Provider
        value={{ ...initUserParams, ...initMessagesParams }}
      >
        <Routes>
          <Route path='/' element={<Navigate to='/welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/chat' element={<Chat sendClicked={sendClicked} />} />
        </Routes>
      </ChatContext.Provider>
    </div>
  );
};

export default App;
