import express from "express";
import cors from "cors";
import { data } from "./utils/data/index.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const apiPort = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  })
);

app.get("/api/data", (req, res) => {
  return res.json(data);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.emit("data-updated", data);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

server.listen(apiPort, () => {
  console.log(`Server is running on http://localhost:${apiPort}`);
});
