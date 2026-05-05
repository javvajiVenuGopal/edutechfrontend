import { useState, useEffect } from "react";

import {
  getMyNotifications,
  markNotificationRead,
  connectNotificationSocket
} from "../../Service/notificationsocket";

function SeniorNotifications() {

  const [notifications, setNotifications] = useState([]);

  // load notifications from backend
  useEffect(() => {

    const loadNotifications = async () => {

      try {

        const res = await getMyNotifications();

        setNotifications(res.data || []);

      } catch (err) {

        console.log("Fetch notifications error:", err);

      }

    };

    loadNotifications();

  }, []);


  // realtime websocket notifications
  useEffect(() => {

    const socket = connectNotificationSocket((data) => {

      setNotifications((prev) => [

        {
          id: Date.now(),
          title: data.title,
          message: data.message,
          is_read: false,
          created_at: new Date().toISOString()
        },

        ...prev

      ]);

    });

    return () => socket?.close();

  }, []);


  // mark notification as read (backend update)
  const markAsRead = async (id) => {

    try {

      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, is_read: true }
            : item
        )
      );

    } catch (err) {

      console.log("Mark read error:", err);

    }

  };


  return (

    <div style={{ padding: "20px" }}>

      <h2>🔔 Senior Notifications</h2>

      {notifications.length === 0 ? (

        <p>No notifications available</p>

      ) : (

        notifications.map((item) => (

          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            style={{
              backgroundColor: item.is_read
                ? "#f1f1f1"
                : "#d4f5ff",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >

            <p>{item.message}</p>

            <small>
              {item.is_read ? "✅ Read" : "🆕 Unread"}
            </small>

          </div>

        ))

      )}

    </div>

  );

}

export default SeniorNotifications;