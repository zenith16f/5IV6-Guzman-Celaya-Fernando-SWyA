export default (io) => {
  //* Connection
  io.on("connection", (socket) => {
    console.log("New client connected:  ", socket.id);

    //* Receiving message
    socket.on("message", (body) => {
      socket.broadcast.emit("message", {
        body,
        from: socket.id.slice(8),
      });
    });

    //* Disconnection
    io.on("disconnection", (socket) => {
      console.log("Client disconnected: ", socket.id);
    });
  });
};
