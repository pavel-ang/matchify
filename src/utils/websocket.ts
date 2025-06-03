import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const socket = new SockJS("https://matchify.info/ws");
const stompClient = new Client({
  webSocketFactory: () => socket,
  reconnectDelay: 5000,
});

export default stompClient;
