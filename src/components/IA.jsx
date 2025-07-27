import React, { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "./chat.jsx";
import "./IA.css";

const features = ["Quiz", "Resume", "Job", "Interview"];

export default function GPTInterface({
  title = "AI Assistant",
  placeholder = "Ask me anything...",
  feature = "Quiz" // 👈 Manually control mode here
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I'm your ${title}. How can I help you today?` }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const assistantReply = await sendChatMessage(userMessage.content, feature, updatedMessages.filter(m => m.role !== 'system'));
      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ API Error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">{title}</div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-bubble">{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={loading ? "Waiting for reply..." : placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>{loading ? "..." : "Send"}</button>
        </form>
      </div>
    </div>
  );
}