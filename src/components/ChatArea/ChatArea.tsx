import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { resetUserUnreadMessagesCount } from '../../store/slices/user.slice';
import AsideNav from './AsideNav/AsideNav';

export default function ChatArea(){

    const { userId } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(resetUserUnreadMessagesCount(userId));
    }, [userId, dispatch, resetUserUnreadMessagesCount]);

    return (
        <div className='p-4 h-full flex'>
            <AsideNav />
            <Outlet />
        </div>       
    );
}