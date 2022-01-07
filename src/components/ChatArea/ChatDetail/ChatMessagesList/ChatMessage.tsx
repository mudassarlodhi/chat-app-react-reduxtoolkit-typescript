import React from 'react';

interface IChatMessageProps { 
    isCurrentUserMessage?: boolean,
    message: string,
    userName: string,
    dateTime: number
}

export default function ChatMessage({isCurrentUserMessage, message, userName, dateTime}: IChatMessageProps){
  let containerClasses: string[] = ['bg-white'];
  let headersTextColorClass = 'text-gray-900';
  let messageTextColorClass = 'text-gray-700';
    
  if(isCurrentUserMessage){
    containerClasses = ['bg-purple-600', 'text-white', 'float-right'];
    headersTextColorClass = 'text-white-900';
    messageTextColorClass = 'text-white-700'; 
  }
    
  const date = new Date(dateTime).toLocaleDateString();
  const time = new Date(dateTime).toLocaleTimeString();
    
  return (
    <>
      <div className={`block p-2 mb-2 lg:w-1/2 md:min-w-[50%] sm:w-full 
            rounded-lg border border-gray-200 shadow-md `+containerClasses.join(' ')}>
        <div className='flex items-center justify-between'>
          <h5 className={'mb-1 text-md font-medium tracking-tight '+headersTextColorClass}>
            { userName }
          </h5>
          <span className={'text-xs '+headersTextColorClass}>{ date } { time }</span>
        </div> 
        <p className={'font-normal text-sm '+messageTextColorClass}>{ message }</p>
      </div>
      { isCurrentUserMessage && <div className='clear-right'></div> }
    </>
  );
}