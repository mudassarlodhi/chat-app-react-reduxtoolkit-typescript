import React, { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

export default function Layout({ children }: {children:ReactNode}){
    return (
        <div>
            <Navbar />
            <div className='h-[calc(100vh-45px)]'>
                { children }  
            </div>         
        </div>
    );
}