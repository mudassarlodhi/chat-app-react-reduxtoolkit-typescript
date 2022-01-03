import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../../shared/interfaces/Message.interface';
import IMessageState  from '../../../shared/interfaces/MessageState.interface';
import { getChatID } from '../../../shared/utils';
import { addMessageToChat, selectMessages } from '../../../store/slices/message.slice';
import { incrementUserUnreadMessagesCount, selectUserById } from '../../../store/slices/user.slice';
import ChatForm from './ChatForm';
import ChatMessagesList from './ChatMessagesList/ChatMessagesList';

export default function ChatDetail(){
    const { userId , secondaryUser } = useParams();
    const navigate = useNavigate();
    const messages: IMessageState  = useSelector(selectMessages);
    const { name:secondaryUserName  } = useSelector(selectUserById(secondaryUser)) || {};
    const { name:primaryUserName  } = useSelector(selectUserById(userId)) || {};
    const dispatch = useDispatch();
    const chatID = getChatID(userId , secondaryUser);
    const chatHistory: Message[] = messages[chatID]; 

    useEffect(()=>{
        if(secondaryUserName) return;
        userId && navigate('/'+userId.toString());
    } , [secondaryUserName , userId, navigate]);

    const onMessageSubmit = (message:string)=>{
        const timestamp = new Date().getTime();
        const chatMessage = { 
            messageId: timestamp.toString(),
            text: message,
            from: userId,
            fromUserName: primaryUserName,
            to: secondaryUser,
            toUserName: secondaryUserName,
            time: timestamp
        };
        dispatch(addMessageToChat({
            chatID,
            chatMessage
        }));
        dispatch(incrementUserUnreadMessagesCount(secondaryUser));

    };

    return (
        <div className='flex-1 lg:ml-5 h-full grid grid-rows-[40px_1fr_70px]'>
            <div className='shadow-[0px_2px_2px_-2px_rgba(0,0,0,0.53)] z-[999999]'>
                <p>{ secondaryUserName }</p>
            </div>
            <ChatMessagesList primaryUserID={userId} messages={chatHistory} />
            <ChatForm onMessageSubmit={onMessageSubmit} />
        </div>       
    );
}