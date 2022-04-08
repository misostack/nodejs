const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const io = new Server(server);

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

app.get("/", (req, res) => {
  console.log(req.socket);
  res.send({ req: req.socket.id });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("example:create", function (payload) {
    const socket = this;
    console.log(payload, socket.send);
    socket.send({ id: 1 });
    return;
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
