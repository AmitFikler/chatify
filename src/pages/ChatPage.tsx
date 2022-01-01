import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import Chat from '../components/Chat';
import MessageForm from '../components/MessageForm';
import UsersList from '../components/UserList';
import { addToChat, onlineUsers, sendMessage } from '../reducers/chatReducer';

import { io, Socket } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../backend-chatify/@types/typesSocketIo';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const { message, username } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [typingUser, setTypingUser] = useState<string>('');

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
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
      }, 3000);
      dispatch(sendMessage({ name: username, message: e.target.value }));
    }
  };

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socketRef.current) {
      if (username) {
        socketRef.current.emit('message', message);
      } else {
        toast.error('You must be logged in to post a message', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="message-page">
      <MessageForm
        onMessageSubmit={onMessageSubmit}
        onTextChange={onTextChange}
      />
      <UsersList />
      <Chat typingUser={typingUser} />
      <ToastContainer />
    </div>
  );
}

export default ChatPage;
