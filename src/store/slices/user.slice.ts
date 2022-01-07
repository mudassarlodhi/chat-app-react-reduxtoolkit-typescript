import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import IUser from '../../shared/interfaces/User.interface';

const initialUsers: IUser[] = [{
    userId: 'user1',
    name: 'User 1',
    unreadMessages: 0
}, {
    userId: 'user2',
    name: 'User 2',
    unreadMessages: 0
}];

export const usersAdapter = createEntityAdapter({
    selectId: (user: IUser) => user.userId,
});

const defaultUserState = usersAdapter.addMany(usersAdapter.getInitialState(), initialUsers);

const { addOne, removeOne } = usersAdapter;

const userSelectors = usersAdapter.getSelectors();

export const userSlice = createSlice({
    name: 'user',
    initialState: defaultUserState,
    reducers: {
        addUser: (state) => {
            const userIds = userSelectors.selectIds(state);
            const usersCount = userIds.length;
            const userId = usersCount == 0 ? 1 : +(userIds[usersCount - 1].toString().substring(4)) + 1;
            const newUser = {
                userId: 'user' + userId,
                name: 'User ' + userId,
                unreadMessages: 0
            };
            addOne(state, newUser);
        },
        deleteUser: removeOne,
        incrementUserUnreadMessagesCount: (state, { payload: userId }) => {
            const user: IUser | undefined = userSelectors.selectById(state, userId);
            user && usersAdapter.updateOne(state, {
                id: userId,
                changes: { unreadMessages: user.unreadMessages + 1 }
            });
        },
        resetUserUnreadMessagesCount: (state, { payload: userId }) => {
            const user: IUser | undefined = userSelectors.selectById(state, userId);
            user && usersAdapter.updateOne(state, {
                id: userId,
                changes: { unreadMessages: 0 }
            });
        }
    }
});

export const { addUser, deleteUser, incrementUserUnreadMessagesCount, resetUserUnreadMessagesCount } = userSlice.actions;

export default userSlice.reducer;

