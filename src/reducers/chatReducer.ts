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
  username: '',
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
    selectUser: (state: ChatState, action: PayloadAction<string>): void => {
      state.message.to = action.payload;
      state.selectedUser = action.payload;
    },
    userLogin: (state: ChatState, action: PayloadAction<string>): void => {
      state.username = action.payload;
      state.message.name = action.payload;
    },
  },
});

export const { sendMessage, addToChat, onlineUsers, selectUser, userLogin } =
  chatReducer.actions;

export default chatReducer.reducer;
