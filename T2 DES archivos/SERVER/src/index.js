//* Imports
import http from "http";
import { Server as WebSocketServer } from "socket.io";
import app from "./settings.js";
import Sockets from "./socket.js";

//* Settings
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new WebSocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

Sockets(io);

//* Server
server.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
