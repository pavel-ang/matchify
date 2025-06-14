// src/components/NotificationBell.tsx
import React, { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { useAuth0 } from "@auth0/auth0-react";
import NotificationList from "./NotificationList";

const NotificationBell: React.FC = () => {
  const { user } = useAuth0();
  const { notifications } = useNotifications(user?.sub);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{ background: "none", border: "none", fontSize: "1.5rem" }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "0.2rem 0.5rem",
              fontSize: "0.8rem",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: 0,
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <NotificationList />
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
