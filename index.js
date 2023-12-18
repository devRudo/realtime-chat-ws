const express = require("express");
const path = require("node:path");
const bodyParser = require("body-parser");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`New User is connected now. ${socket?.id}`);
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
