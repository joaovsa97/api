import { createServer } from "http";
import { Server } from "socket.io";
import express from "express"

const app = express()

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin: "https://next-socketio-client.vercel.app"
  }
});

io.on("connection", (socket) => {
  console.log("conectado")

  socket.on("message", (message) => {
    console.log("new message received,", message)

    io.emit("new-message", message)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected.")
  })
});

httpServer.listen(8084);