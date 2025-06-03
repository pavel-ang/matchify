import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useWebSocket = (onMessageReceived: (msg: any) => void) => {
  const { user } = useAuth0();
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!user?.sub) return;

    const socket = new SockJS("https://matchify.info/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/user/${user.sub}/queue/messages`, (message) => {
          onMessageReceived(JSON.parse(message.body));
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [user?.sub, onMessageReceived]);

  const sendMessage = (msg: any) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(msg),
      });
    }
  };

  return { sendMessage };
};

export default useWebSocket;
