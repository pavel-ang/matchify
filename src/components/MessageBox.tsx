import React, { useState } from "react";

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
}

interface MessageBoxProps {
  messages: Message[];
  onSend: (message: string) => void;
  disabled?: boolean; 
}

const MessageBox: React.FC<MessageBoxProps> = ({ messages, onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ margin: "0.5rem 0" }}>
            <strong>{msg.senderId}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
          placeholder="Type your message..."
          disabled={disabled}
        />
        <button onClick={handleSend} style={{ padding: "0.5rem 1rem" }} disabled={disabled || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
