import React from 'react';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl px-4 py-2 rounded-lg shadow ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

