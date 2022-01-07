import Message from '../shared/interfaces/Message.interface';
import { messageAdapter } from './slices/message.slice';
import { usersAdapter } from './slices/user.slice';
import { RootState } from './store';

//Users Selectors
const userSelectors = usersAdapter.getSelectors((state:RootState) => state.users);

export const selectAllUsers = (state: RootState)=>userSelectors.selectAll(state);
export const selectUserById = (state: RootState, id:string)=>userSelectors.selectById(state, id);

//Messages Selectors
const messageSelectors = messageAdapter.getSelectors((state:RootState) => state.messages);

export const selectAllMessages = (state: RootState)=>messageSelectors.selectAll(state);
export const selectChatMessages = (userKey:string)=>(state: RootState)=>(
  messageSelectors.selectAll(state).filter((message:Message)=>message.usersKey==userKey)
);