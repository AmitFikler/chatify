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
    sendMessage: (state, action: PayloadAction<Message>): ChatState => {
      return { ...state, message: action.payload };
    },
  },
});

export const { sendMessage } = chatReducer.actions;

export default chatReducer.reducer;
