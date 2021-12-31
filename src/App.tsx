import { Route, Routes } from 'react-router';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
