import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addToChat, onlineUsers, sendMessage } from './reducers/chatReducer';

import UsersList from './components/UserList';
import Chat from './components/Chat';
import MessageForm from './components/MessageForm';

import { io, Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../backend-chatify/@types/typesSocketIo';

function App() {
  const message = useAppSelector((state) => state.chat.message);
  const dispatch = useAppDispatch();

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    socketRef.current = io('http://localhost:4000', {
      auth: { user: 'user' },
    });
    socketRef.current.on('onlineUser', (data) => {
      dispatch(onlineUsers(data));
    });
    socketRef.current.on('replayMessage', ({ name, message }) => {
      dispatch(addToChat({ name, message }));
    });
  }, []);

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(sendMessage({ ...message, [e.target.name]: e.target.value }));
  };

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit('message', message);
    }
  };

  return (
    <div className="App">
      <MessageForm
        onMessageSubmit={onMessageSubmit}
        onTextChange={onTextChange}
      />
      <UsersList />
      <Chat />
    </div>
  );
}

export default App;
