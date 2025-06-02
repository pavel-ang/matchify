import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MessageBox from "../components/MessageBox";
import useMessageService from "../api/messageService";

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
}

const Chat = () => {
  const { user } = useAuth0();
  const { getChatHistory, sendMessage: sendMsg } = useMessageService();
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (user?.sub && receiverId) {
        const chat = await getChatHistory(user.sub, receiverId);
        setMessages(chat);
      }
    };
    fetchMessages();
  }, [user, receiverId, getChatHistory]);

  const handleSend = async (text: string) => {
    if (!user?.sub || !receiverId) return;

    const newMessage = {
      senderId: user.sub,
      receiverId,
      content: text,
    };

    const saved = await sendMsg(newMessage);
    setMessages((prev) => [...prev, saved]);
  };

  return (
    <div>
      <h2>Chat with: {receiverId || "..."}</h2>
      <input
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <MessageBox messages={messages} onSend={handleSend} />
    </div>
  );
};

export default Chat;
