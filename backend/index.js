import express from "express";
import cors from "cors";
import { data } from "./utils/data/index.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const apiPort = 8000;
const socketPort = 8001;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.get("/api/data", (req, res) => {
  console.log("hdaskj");
  return res.json(data);
});

const socketServer = http.createServer();

const socketIO = new Server(socketServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

console.log(socketIO);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.listen(apiPort, () => {
  console.log(`API is running on http://localhost:${apiPort}`);
});

socketServer.listen(socketPort, () => {
  console.log(`Socket.IO server is running on http://localhost:${socketPort}`);
});
