import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import messageReducer from './slices/message.slice';

const store = configureStore({
  reducer: {
    users: userReducer,
    messages: messageReducer
  } 
});

export default store;

export type RootState = ReturnType<typeof store.getState>;