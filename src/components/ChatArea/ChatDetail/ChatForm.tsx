import React, { useState } from 'react';

interface IChatFormProps {
    onMessageSubmit: (message: string) => void
}

export default function ChatForm({ onMessageSubmit }: IChatFormProps) {
  const [message, setMessage] = useState('');

  const onMessageSend = () => {
    setMessage('');
    onMessageSubmit(message);
  };

  return (
    <div className='flex justify-items mt-1'>
      <textarea
        name="email" value={message} onChange={({ target: { value } }) => setMessage(value)}
        className="resize-none px-3 py-2 bg-white border shadow-sm border-gray-300 
                placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 
                block w-full rounded-md sm:text-sm focus:ring-1 mr-4"
        placeholder="Type your message here....." >
      </textarea>

      <button onClick={onMessageSend}
        disabled={message.trim() === ''}
        type="button"
        className="px-6 py-2 border-2 border-blue-400 text-blue-400 
                font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 
                focus:outline-none focus:ring-0 transition duration-150 ease-in-out disabled:bg-gray-50 
                disabled:border-gray-50 disabled:text-gray-400">
        Send
      </button>
    </div>
  );
}