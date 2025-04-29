import React, { useState } from "react";
import "./ChatScreen.css";
import { fetchGeminiReply } from "../services/gemini";
import ReactMarkdown from 'react-markdown';



const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
  
    const reply = await fetchGeminiReply(input);
    const botMessage = { text: reply, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);
  };
  

  
  return (
    
    <div className="chat-screen">
        <h1>AI ChatBot</h1>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.sender === "bot" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gemini something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
