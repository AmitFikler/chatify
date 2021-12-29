import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { TextField } from '@material-ui/core';
import { nanoid } from 'nanoid';

import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from './@types/types';

function App() {
  // useStates
  const [message, setMessage] = useState<Message>({ message: '', name: '' }); // Message state
  const [chat, setChat] = useState<Message[]>([]); // chat "history"

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    socketRef.current = io('http://localhost:4000'); // connecting to 'http://localhost:4000'
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
    const { name, message }: { name: string; message: string } = message;
    if (socketRef.current) {
      socketRef.current.emit('message', { name, message });
      setMessage({ message: '', name });
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
      <div className="chat-data">{renderChat()}</div>
    </div>
  );
}

export default App;
