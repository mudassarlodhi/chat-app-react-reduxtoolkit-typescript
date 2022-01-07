import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import Message from '../../shared/interfaces/Message.interface';
import MessageState from '../../shared/interfaces/MessageState.interface';

const initialMessageState: MessageState = [{
    messageId: '123456',
    usersKey: 'user1_user2',
    text: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order',
    from: 'user1',
    fromUserName: 'User 1',
    to: 'user2',
    toUserName: 'User 2',
    time: new Date().getTime()
},
{
    messageId: '123459',
    usersKey: 'user1_user2',
    text: 'Response to Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order',
    from: 'user2',
    fromUserName: 'User 2',
    to: 'user1',
    toUserName: 'User 1',
    time: new Date().getTime()
}];

export const messageAdapter = createEntityAdapter({
    selectId: (message: Message) => message.messageId,
});

const defaultMessageState = messageAdapter.addMany(messageAdapter.getInitialState(), initialMessageState);

const { addOne } = messageAdapter;

const messageSelectors = messageAdapter.getSelectors();

export const messageSlice = createSlice({
    name: 'message',
    initialState: defaultMessageState,
    reducers: {
        addMessageToChat: addOne,
        deleteChatHistoryForTheUser: (state, { payload: userId }) => {
            const removedChats = messageSelectors.selectAll(state).filter(message=>message.from!==userId && message.to!==userId);
            messageAdapter.setAll(state , removedChats);
        }
    }
});

export const { addMessageToChat, deleteChatHistoryForTheUser } = messageSlice.actions;

export default messageSlice.reducer;

