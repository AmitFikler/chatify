import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from '../../backend-chatify/@types/typesSocketIo';

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
  },
});

export const { sendMessage, addToChat } = chatReducer.actions;

export default chatReducer.reducer;
