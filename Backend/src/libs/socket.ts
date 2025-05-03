import { Server } from "socket.io";

export function socketInit(appServer: any) {
  const io = new Server(appServer);

  io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });
  });
}
