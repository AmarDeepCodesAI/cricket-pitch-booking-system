import http from "http";

import app from "./app";

import {
  cleanupExpiredReservations,
} from "./services/reservationCleanup";

import {
  initSocket,
} from "./sockets/socket";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

setInterval(() => {
  cleanupExpiredReservations();
}, 30000);