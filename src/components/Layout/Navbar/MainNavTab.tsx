import React, { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteChatHistoryForTheUser } from '../../../store/slices/message.slice';
import { deleteUser } from '../../../store/slices/user.slice';

interface IMainNavTabProps {
    user: string,
    userId: string,
    unreadMessages: number
}

export default function MainNavTab({ user, userId, unreadMessages }: IMainNavTabProps) {
    const dispatch = useDispatch();
   
    const onClickDelete = useCallback((event: MouseEvent)=>{
        event.preventDefault();
        dispatch(deleteUser(userId));
        dispatch(deleteChatHistoryForTheUser(userId));
    } , [dispatch , deleteUser]);

    return (
        <NavLink to={'/'+userId} className={({ isActive })=>'main-nav-tab inline-flex justify-center items-center min-w-[120px] px-[10px] py-[6px] border border-gray-300 rounded-t-lg shadow-sm text-sm font-semibold text-gray-700 mr-2 '+(isActive ? 'bg-rose-400 active': 'bg-white hover:bg-gray-50')}>
            <span className='mr-1'>{ user }</span>
            { !!unreadMessages && <span className='mr-4 text-cyan-600 main-nav-tab-messages'>({ unreadMessages })</span> }
            <button type='button' className='main-nav-tab-close bg-red-500 rounded-lg h-[15px] w-[15px] text-white flex justify-center inline-block leading-none hover:cursor-default' onClick={onClickDelete}>x</button>
        </NavLink>
    );
}