import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import '../styles/Chatbot.css';

const API_KEY = 'AIzaSyCL6elvZ52diTQeZAtZLbhzAxFgAm6G6do'; // insert your API key here

const genAI = new GoogleGenerativeAI(API_KEY);

interface Message {
  text: string;
  role: 'user' | 'model';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages: Message[] = [...messages, { text: input, role: 'user' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({
      history: newMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      generationConfig: { maxOutputTokens: 100 },
    });

    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = await response.text();

    setLoading(false);
    setMessages([...newMessages, { text, role: 'model' }]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chatbot-message model loading">
            <div className="dot-flashing"></div>
            <div className="dot-flashing"></div>
            <div className="dot-flashing"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chatbot-input"
          placeholder="Type your question..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button onClick={handleSendMessage} className="chatbot-send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;