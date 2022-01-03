import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUsers } from '../../../store/slices/user.slice';
import MainNavTab from './MainNavTab';
import classes from './Navbar.module.css';

export default function Navbar(){
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();
    return (
        <div className='h-[45px] bg-indigo-500/50 flex just items-end justify-start px-24'>
            <div className={'flex mx-2 max-w-[calc(100%-50px)] overflow-y-auto '+classes.NavbarTabsList} >
                {
                    users.map(({name , unreadMessages, userId})=><MainNavTab key={userId} user={name} unreadMessages={unreadMessages} userId={userId} />)
                }
            </div>
            <button className='flex items-center bg-gray-500/60 rounded-lg mb-1 px-[8px] py-[1px] hover:bg-[#FAF9F6] text-xl' onClick={()=>dispatch(addUser())}>&#43;</button>           
        </div>
    );
}