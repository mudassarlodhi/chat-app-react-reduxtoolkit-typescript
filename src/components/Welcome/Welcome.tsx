import React from 'react';

export default function Welcome(){
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <h1 className='text-5xl text-sky-500'>
        Welcome To The 
        <span className="mx-2 before:block before:absolute before:-inset-1 
                before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">Chat</span>
        </span>
        Application!
      </h1>
    </div>
  );
}