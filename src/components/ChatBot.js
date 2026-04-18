import React, { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Call AI backend (replace this with your API endpoint)
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I couldn't process that." },
      ]);
    }
  };

  return (
    <div style={chatContainer}>
      <div style={messagesContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === "bot" ? "left" : "right",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                backgroundColor: msg.from === "bot" ? "#eee" : "#2ecc71",
                color: msg.from === "bot" ? "#000" : "#fff",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} style={{ marginLeft: 5 }}>
          Send
        </button>
      </div>
    </div>
  );
}

const chatContainer = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "300px",
  backgroundColor: "#fff",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
};

const messagesContainer = {
  maxHeight: "200px",
  overflowY: "auto",
};

export default ChatBot;