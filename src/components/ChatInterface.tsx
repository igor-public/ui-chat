
"use client";

import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

// --- Configuration Placeholder ---
// In a real application, you would configure your API endpoint and key here.
// Example:
// const API_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_API_ENDPOINT || '/api/chat';
// const API_KEY = process.env.NEXT_PUBLIC_CHAT_API_KEY;
// You would then use these in the handleSendMessage function to call your backend.
// For now, we are using a simulated response.
// --- End Configuration Placeholder ---

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold interval ID

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    // Clear any existing streaming interval before starting a new one
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // --- Dummy Bot Response (Streaming Simulation) ---
    const botMessageId = Date.now() + 1; // Unique ID for the bot message
    // Reverted to ~100 words
    const fullBotResponse = 'Please note that this is currently a demonstration interface and not connected to a live conversational AI model. The response you see here is a pre-written placeholder message designed to mimic the behavior of a real chatbot. In a fully functional version, your input would be sent to a backend API for processing by an advanced language model, which would then generate a relevant and contextual response. The integration for this API connection is planned but not yet implemented. This placeholder ensures the chat flow is visible and allows testing of the user interface components like message display and input handling.'; 

    // Add an empty bot message placeholder first
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: botMessageId, text: '', sender: 'bot' },
    ]);

    // Simulate streaming effect
    let index = 0;
    streamIntervalRef.current = setInterval(() => {
      if (index < fullBotResponse.length) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: fullBotResponse.substring(0, index + 1) } // Append next character
              : msg
          )
        );
        index++;
      } else {
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current); // Stop streaming when done
          streamIntervalRef.current = null;
        }
      }
    }, 15); // Faster streaming speed (15ms per character)
    // --- End Dummy Bot Response ---
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.text} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
