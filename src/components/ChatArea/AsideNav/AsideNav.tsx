import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IUser from '../../../shared/interfaces/User.interface';
import { selectUsers } from '../../../store/slices/user.slice';
import AsideNavTab from './AsideNavTab';

export default function AsideNav() {
    const { userId } = useParams();
    const users: IUser[] = useSelector(selectUsers).filter(user=>user.userId !== userId);
    return (
        <div
            className='flex flex-col justify-between bg-slate-50 rounded-md	 w-64 px-3 py-2 bg-white border-r dark:bg-gray-800 dark:border-gray-60 h-full overflow-y-auto'>
            <div className="flex flex-col justify-between flex-1 mt-4">
                <nav>
                    { users.map(user=><AsideNavTab key={user.userId} user={user} />)}
                </nav>
                <hr className="my-6 dark:border-gray-600" />
            </div>
        </div>
    );
}