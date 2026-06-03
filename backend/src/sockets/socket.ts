import { Server } from "socket.io";

let io: Server;

export const initSocket = (
  server: any
) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(
      "User Connected:",
      socket.id
    );

    socket.on(
      "join-pitch",
      (pitchId: string) => {
        socket.join(pitchId);

        console.log(
          `Joined room ${pitchId}`
        );
      }
    );

    socket.on("disconnect", () => {
      console.log(
        "User Disconnected:",
        socket.id
      );
    });
  });

  return io;
};

export const getIO = () => io;