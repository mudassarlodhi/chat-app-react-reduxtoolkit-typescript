import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../../shared/interfaces/Message.interface';
import IUser from '../../../shared/interfaces/User.interface';
import { getChatID } from '../../../shared/utils';
import { selectChatMessages, selectUserById } from '../../../store/selectors';
import { addMessageToChat } from '../../../store/slices/message.slice';
import { incrementUserUnreadMessagesCount } from '../../../store/slices/user.slice';
import { RootState } from '../../../store/store';
import ChatForm from './ChatForm';
import ChatMessagesList from './ChatMessagesList/ChatMessagesList';

export default function ChatDetail(){
  const { userId = '', secondaryUser = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  const primaryUserRecord : IUser | undefined = useSelector(
    (state:RootState)=>selectUserById(state, userId));
    
  const secondaryUserRecord : IUser | undefined = useSelector(
    (state:RootState)=>selectUserById(state, secondaryUser));
    
  const secondaryUserName = secondaryUserRecord?.name;
  const primaryUserName  = primaryUserRecord?.name;
    
  const chatID = getChatID(userId, secondaryUser);
  const chatHistory: Message[] = useSelector(selectChatMessages(chatID));

  useEffect(()=>{
    if(secondaryUserName) return;
    userId && navigate('/'+userId.toString());
  }, [secondaryUserName, userId, navigate]);

  const onMessageSubmit = (message:string)=>{
    const timestamp = new Date().getTime();
    const chatMessage = { 
      messageId: timestamp.toString(),
      usersKey: chatID, 
      text: message,
      from: userId || '',
      fromUserName: primaryUserName || '',
      to: secondaryUser || '',
      toUserName: secondaryUserName || '',
      time: timestamp
    };
    dispatch(addMessageToChat(chatMessage));
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