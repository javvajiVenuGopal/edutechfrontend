let notificationSocket = null;

export const connectNotificationSocket = (onMessage) => {

  const token = localStorage.getItem("token");

  if (!token) {

    console.warn("⚠️ No token found");

    return null;

  }

  // close old socket if exists
  if (notificationSocket) {

    notificationSocket.close();

  }

  notificationSocket = new WebSocket(
    `wss://backend.exameets.in/notifications/ws/notifications?token=${token}`
  );

  notificationSocket.onopen = () => {

    console.log("✅ Notification socket connected");

  };

  notificationSocket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    console.log("🔔 Notification received:", data);

    if (onMessage) {

      onMessage(data);

    }

  };

  notificationSocket.onclose = () => {

    console.log("❌ Notification socket disconnected");

  };

  notificationSocket.onerror = (err) => {

    console.log("Socket error:", err);

  };

  return notificationSocket;

};


// ✅ THIS FUNCTION WAS MISSING (CAUSE OF ERROR)
export const closeNotificationSocket = () => {

  if (notificationSocket) {

    notificationSocket.close();

    notificationSocket = null;

  }

};
