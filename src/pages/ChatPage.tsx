import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import Chat from '../components/Chat';
import MessageForm from '../components/MessageForm';
import UsersList from '../components/UserList';
import { addToChat, onlineUsers, sendMessage } from '../reducers/chatReducer';

import { io, Socket } from 'socket.io-client';

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../backend-chatify/@types/typesSocketIo';

function ChatPage() {
  const { message, username } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [typingUser, setTypingUser] = useState<string>('');

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    socketRef.current = io('http://localhost:4000', {
      auth: { user: username },
    });
    socketRef.current.on('onlineUser', (data) => {
      dispatch(onlineUsers(data));
    });
    socketRef.current.on('replayMessage', ({ name, message }) => {
      dispatch(addToChat({ name, message }));
    });
    socketRef.current.on('userTypingReplay', ({ name, typing }) => {
      if (typing) {
        setTypingUser(name + ' is typing...');
      } else {
        setTypingUser('');
      }
    });
  }, []);

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (socketRef.current) {
      socketRef.current.emit('userTyping', { name: username, typing: true });
      setTimeout(() => {
        socketRef.current!.emit('userTyping', {
          name: username,
          typing: false,
        });
      }, 2000);
      dispatch(sendMessage({ name: username, message: e.target.value }));
    }
  };

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socketRef.current) {
      console.log(message);
      socketRef.current.emit('message', message);
    }
  };

  return (
    <div className="message-page">
      <MessageForm
        onMessageSubmit={onMessageSubmit}
        onTextChange={onTextChange}
      />
      <UsersList />
      <Chat />
      <h5>{typingUser}</h5>
    </div>
  );
}

export default ChatPage;
