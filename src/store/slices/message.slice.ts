import { createSlice } from '@reduxjs/toolkit';
import  IMessageState from '../../shared/interfaces/MessageState.interface';
import { RootState } from '../store';

const initialMessageState : IMessageState = {
    'user1_user2': [{
        messageId: '123456',
        text: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order',
        from: 'user1',
        fromUserName: 'User 1',
        to: 'user2',
        toUserName: 'User 2',
        time: new Date().getTime()
    },
    {
        messageId: '123459',
        text: 'Response to Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order',
        from: 'user2',
        fromUserName: 'User 2',
        to: 'user1',
        toUserName: 'User 1',
        time: new Date().getTime()
    }]
};

export const messageSlice = createSlice({
    name: 'message',
    initialState: initialMessageState,
    reducers: {
        addMessageToChat: (state, { payload }) => {
            const { chatID, chatMessage } = payload;
            if(state[chatID])
            {
                state[chatID].push(chatMessage);
            }
            else {
                state[chatID] = [chatMessage];
            }
        },
        deleteChatHistoryForTheUser: (state , { payload:userId})=>{
            const userChatKeys = Object.keys(state).filter(chatKey=>chatKey.split('_').find((user:string)=>user===userId));
            userChatKeys.forEach(chatKey=>{
                delete state[chatKey];
            });
        } 
    }
});

export const { addMessageToChat, deleteChatHistoryForTheUser } = messageSlice.actions;

export const selectMessages = (state: RootState) => state.messages;

export default messageSlice.reducer;

