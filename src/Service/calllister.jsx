const BASEURL = "http://seniorguide.exameets.com";

export const connectIncomingCallSocket = (
  userId,
  onMessage
) => {

  if (!userId) {

    console.log("❌ userId missing");

    return null;

  }

  const wsUrl =
    `${BASEURL.replace("http", "ws")}/call/ws/call/${userId}`;

  console.log("Connecting socket:", wsUrl);

  const socket = new WebSocket(wsUrl);


  socket.onopen = () => {

    console.log("✅ socket connected");

  };


  socket.onmessage = (event) => {

    try {

      const data = JSON.parse(event.data);

      console.log("📩 socket message:", data);

      if (onMessage) {

        onMessage(data);

      }

    } catch (err) {

      console.log("❌ socket parse error", err);

    }

  };


  socket.onerror = (err) => {

    console.log("❌ socket error", err);

  };


  socket.onclose = () => {

    console.log("🔌 socket closed");

  };


  return socket;

};
