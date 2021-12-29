import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { TextField } from '@material-ui/core';
import { nanoid } from 'nanoid';

import {
  Message,
  ServerToClientEvents,
  ClientToServerEvents,
  User,
} from '../backend-chatify/@types/typesSocketIo';
import UsersList from './components/UserList';

function App() {
  // useStates
  const [message, setMessage] = useState<Message>({ message: '', name: '' }); // Message state
  const [chat, setChat] = useState<Message[]>([]); // chat "history"
  const [usersOnline, setUsersOnline] = useState<User[]>([]); // users online array

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    socketRef.current = io('http://localhost:4000', {
      // connecting to 'http://localhost:4000'
      auth: { user: 'user' + usersOnline.length },
    });
    socketRef.current.on('onlineUser', (data) => {
      setUsersOnline(data);
    });
    socketRef.current.on('replayMessage', ({ name, message }) => {
      setChat((prevState) => {
        return [...prevState, { name, message }];
      });
    });
    // return () => socketRef.current.disconnect();
  }, []);

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit('message', message);
      setMessage({ message: '', name: '' });
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
      <UsersList users={usersOnline} />
      <div className="chat-data">{renderChat()}</div>
    </div>
  );
}

export default App;
