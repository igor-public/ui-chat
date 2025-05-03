"use client";

import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    // Auto-resize textarea
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSendClick = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
      // Reset textarea height after sending
      const textarea = document.getElementById('chat-input-textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default Enter behavior (new line)
      handleSendClick();
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex items-end space-x-2">
      <textarea
        id="chat-input-textarea"
        rows={1}
        className="flex-grow p-2 border border-gray-300 dark:border-gray-500 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
        placeholder="Type your message here..."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ maxHeight: '150px', overflowY: 'auto' }}
      />
      <button
        onClick={handleSendClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={!inputText.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
