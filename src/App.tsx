import { io, Socket } from 'socket.io-client';
import { TextField } from '@material-ui/core';

import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from './@types/types';
function App() {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'http://localhost:4000'
  ); // check

  // useStates
  const [message, setMessage] = useState<Message>({ message: '', name: '' }); // Message
  const [chat, setChat] = useState<Message[]>([]); // chat "history"

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('replayMessage', ({ name, message }) => {
        setChat((prevState) => {
          return [...prevState, { name, message }];
        });
      });
    });

    // return () => socketRef.current.disconnect();
  }, []);

  return (
    <div className="App">
      <h1> hello world</h1>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
    </div>
  );
}

export default App;
