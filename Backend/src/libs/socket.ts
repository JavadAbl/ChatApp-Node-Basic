import { Server } from "socket.io";

export function socketInit(appServer: any) {
  const io = new Server(appServer, { cors: { origin: "http://localhost:5173", credentials: true } });

  const onlineUsers: Set<number> = new Set();

  io.on("connection", (socket) => {
    console.log("User connected");

    const userId = socket.handshake.query.userId;
    onlineUsers.add(Number(userId));

    io.emit("onlineUsers", Array.from(onlineUsers));

    socket.on("disconnect", () => {
      console.log("User disconnected");
      onlineUsers.delete(Number(userId));
      io.emit("onlineUsers", Array.from(onlineUsers));
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });
  });
}
