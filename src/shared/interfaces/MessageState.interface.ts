import Message from './Message.interface';

interface MessageState { 
    [key: string]: Message[]
}

export default MessageState;