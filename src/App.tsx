import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addToChat, onlineUsers, sendMessage } from './reducers/chatReducer';

import UsersList from './components/UserList';

import { io, Socket } from 'socket.io-client';
import { TextField } from '@material-ui/core';
import { nanoid } from 'nanoid';

import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../backend-chatify/@types/typesSocketIo';

function App() {
  const { message, chat } = useAppSelector((state) => state.chat);
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

  const renderChat = () => {
    return chat.map(({ name, message }) => (
      <div key={nanoid()}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="App">
      <form style={{ padding: '15px' }} onSubmit={onMessageSubmit}>
        <div>
          <TextField
            required
            id="outlined-required"
            label="name"
            onChange={(e) => onTextChange(e)}
            defaultValue="name"
            name="name"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="message"
            onChange={(e) => onTextChange(e)}
            defaultValue="Hello World"
            name="message"
          />
        </div>
        <button>Send</button>
      </form>
      <UsersList />
      <div className="chat-data">{renderChat()}</div>
    </div>
  );
}

export default App;
