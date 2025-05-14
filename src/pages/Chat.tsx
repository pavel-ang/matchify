import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ border: "1px solid gray", padding: "10px", minHeight: "200px" }}>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>User:</strong> {msg}</p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
