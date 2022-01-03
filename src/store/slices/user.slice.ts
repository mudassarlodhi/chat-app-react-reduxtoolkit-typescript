import { createSlice } from '@reduxjs/toolkit';
import IUser from '../../shared/interfaces/User.interface';
import { RootState } from '../store';

const initialUsersState : IUser[] = [{
    userId: 'user1',
    name: 'User 1',
    unreadMessages: 0
} , {
    userId: 'user2',
    name: 'User 2',
    unreadMessages: 0
}];

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUsersState,
    reducers: {
        addUser: state => {
            const newUserID = state.length == 0 ? 1 : (+state[state.length-1].name.split(' ')[1])+1;
            state.push({
                userId: 'user'+newUserID,
                name: 'User '+newUserID,
                unreadMessages: 0
            });
        },
        deleteUser: (state, { payload:userId }) => {
            const index = state.findIndex(user=>user.userId == userId);
            state.splice(index, 1);
        },
        incrementUserUnreadMessagesCount: (state, { payload:userId }) => {
            const user = state.find(user=>user.userId === userId);
            user && (user.unreadMessages+=1);
        },
        resetUserUnreadMessagesCount: (state, { payload:userId }) => {
            const user = state.find(user=>user.userId === userId);
            user && (user.unreadMessages = 0);
        }
    }
});
// each case under reducers becomes an action
export const { addUser, deleteUser, incrementUserUnreadMessagesCount, resetUserUnreadMessagesCount } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export const selectUserById = (userId: string | undefined)=>(state: RootState) => state.users.find(user=>user.userId == userId);

export default userSlice.reducer;

