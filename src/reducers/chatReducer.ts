import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChatState,
  Message,
  User,
} from '../../backend-chatify/@types/typesSocketIo';

const initialState: ChatState = {
  message: { name: '', message: '' },
  chat: [],
  usersOnline: [],
  selectedUser: '',
};

export const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (
      state: ChatState,
      action: PayloadAction<Message>
    ): ChatState => {
      return { ...state, message: action.payload };
    },
    addToChat: (
      state: ChatState,
      action: PayloadAction<Message>
    ): ChatState => {
      return { ...state, chat: [...state.chat, action.payload] };
    },
    onlineUsers: (
      state: ChatState,
      action: PayloadAction<User[]>
    ): ChatState => {
      return { ...state, usersOnline: action.payload };
    },
    selectUser: (
      state: ChatState,
      action: PayloadAction<string>
    ): ChatState => {
      return { ...state, selectedUser: action.payload };
    },
  },
});

export const { sendMessage, addToChat, onlineUsers } = chatReducer.actions;

export default chatReducer.reducer;
