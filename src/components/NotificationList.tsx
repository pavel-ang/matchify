// src/components/NotificationList.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNotifications } from "../hooks/useNotifications";

const NotificationList: React.FC = () => {
  const { user } = useAuth0();
  const { notifications, markAsRead } = useNotifications(user?.sub);

  return (
    <div>
      <h3>🔔 Notifications</h3>
      {notifications.length === 0 && <p>No new notifications.</p>}
      {notifications.map((notif) => (
        <div
          key={notif.id}
          onClick={() => !notif.read && markAsRead(notif.id)}
          style={{
            border: "1px solid #ccc",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            backgroundColor: notif.read ? "#f9f9f9" : "#e6f7ff",
            cursor: "pointer",
          }}
        >
          <p>
            <strong>{notif.from}</strong> sent you a {notif.type}
          </p>
          <small>{new Date(notif.timestamp?.toDate()).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
