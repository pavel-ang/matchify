import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import useMessageService from "../api/messageService";
import useWebSocket from "../utils/useWebSocket";

const Chat = () => {
  const { user } = useAuth0();
  const { userId: receiverId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const { getChatHistory } = useMessageService();

  const isDuplicate = (newMsg: any, msgs: any[]) => {
    return msgs.some(
      (msg) =>
        msg.id === newMsg.id || msg.timestamp === newMsg.timestamp
    );
  };

  const handleIncomingMessage = useCallback((msg: any) => {
    setMessages((prev) => {
      if (isDuplicate(msg, prev)) return prev;
      return [...prev, msg];
    });
  }, []);

  const { sendMessage } = useWebSocket(handleIncomingMessage);

  useEffect(() => {
    const fetch = async () => {
      if (user?.sub && receiverId) {
        const chat = await getChatHistory(user.sub, receiverId);
        setMessages(chat);
      }
    };
    fetch();
  }, [user?.sub, receiverId]);

  const handleSend = (text: string) => {
    if (!user?.sub || !receiverId) return;

    const timestamp = new Date().toISOString(); 
    const message = {
      senderId: user.sub,
      receiverId,
      content: text,
      timestamp, // include timestamp
    };

    setMessages((prev) => {
      if (isDuplicate(message, prev)) return prev;
      return [...prev, message];
    });

    sendMessage(message);
  };

  return (
    <div>
      <h2>Chat with: {receiverId}</h2>

      <Link to="/matches">
        <button style={{ marginBottom: "1rem" }}>← Back to Matches</button>
      </Link>

      <MessageBox messages={messages} onSend={handleSend} />
    </div>
  );
};

export default Chat;
