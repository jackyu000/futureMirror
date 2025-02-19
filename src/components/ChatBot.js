import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = ({ persona }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create system message from persona
  const createSystemMessage = (persona) => {
    let systemMessage = "You are the future version of the user, 30 years from now in 2055. Based on the following health characteristics and lifestyle choices from their younger self. make it funny. If i get negative responses, make it sarcastic and sad. If i get positive responses, make it uplifting and positive and joking:\n\n";
    persona.forEach(item => {
      systemMessage += `${item.attribute}: ${item.result}\n`;
    });
    systemMessage += "\nAs their future self share insights, experiences, and wisdom gained. Discuss both positive outcomes and challenges faced due to these health factors. Provide guidance from your future perspective while maintaining empathy and understanding. Remember to:\n";
    systemMessage += "1. Speak as if you are them in 2055, shaped by their current health profile. Do they slur, talk slower or less intelligently?\n";
    systemMessage += "2. Share personal anecdotes and life experiences that stemmed from these characteristics\n";

    return systemMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: createSystemMessage(persona) },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      const data = await response.json();
      const botMessage = { role: 'assistant', content: data.choices[0].message.content };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
