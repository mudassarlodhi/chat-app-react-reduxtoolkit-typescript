import React from 'react';
import { NavLink } from 'react-router-dom';
import IUser  from '../../../shared/interfaces/User.interface';

interface IAsideNavTabProps {
    user: IUser,
    isActive?: boolean
}

export default function AsideNavTab({ user }: IAsideNavTabProps){
    const { name , userId }:IUser = user;
    const activeTabClass = 'bg-rose-400';
    const nonActiveTabClass = 'transition-colors duration-200 transform hover:text-gray-700 hover:bg-gray-200';

    return (
        <NavLink to={userId} className={({ isActive })=>'flex items-center mb-5 px-4 py-2 text-gray-700 rounded-md  hover:text-gray-700 '+(isActive ? activeTabClass : nonActiveTabClass) }>
            <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <span className="mx-4 font-medium">{ name }</span>
        </NavLink>
    );
}