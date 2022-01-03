import React, { useEffect, useRef } from 'react';
import Message from '../../../../shared/interfaces/Message.interface';
import ChatMessage from './ChatMessage';

interface IChatMessagesListProps {
    messages: Message[],
    primaryUserID?: string
}

export default function ChatMessagesList({ messages, primaryUserID = '' }: IChatMessagesListProps){
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { length:messagesCount } = messages || {}; 
    useEffect(() => {
        if(!chatContainerRef.current) return;
        chatContainerRef.current.scroll({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [messagesCount , chatContainerRef]);

    return (
        <div className='bg-slate-50 p-2 overflow-y-auto' ref={chatContainerRef}>
            {
                messages && Object.entries(messages).map(([key , value])=>{
                   return <ChatMessage dateTime={value.time} message={value.text} userName={value.fromUserName} isCurrentUserMessage={primaryUserID === value.from} key={key} />    ;
                })
            }
        </div>
    );
}