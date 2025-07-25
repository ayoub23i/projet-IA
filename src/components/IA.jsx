import React, { useState } from "react";
import axios from "axios";
import "./IA.css";

// Load API key from .env (Vite)
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export default function GPTInterface({ title = "AI Assistant", placeholder = "Ask me anything...", systemPrompt }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I'm your ${title}. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newUserMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      console.log("API KEY:", apiKey);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: systemPrompt },
            ...updatedMessages
          ],
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const assistantReply = response.data.choices?.[0]?.message?.content || "No response received.";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message;
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ API Error: " + errorMsg }]);
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
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={loading ? "Waiting for reply..." : placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}