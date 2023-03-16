import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/welcome' />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
