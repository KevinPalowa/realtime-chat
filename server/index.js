const express = require("express");
const app = express();
const PORT = 3001;

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const io = require("socket.io")(http, {
  cors: {
    origin: true,
  },
});

//Add this before the app.get() block
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  socket.on("message", (data) => {
    console.log(socket.id, "send: ", data);
    io.emit("messageResponse", data);
  });
  socket.on("isTyping", (data) => {
    console.log(socket.id, "isTypingResponse: ", data);
    io.emit("isTypingResponse", data);
  });
});
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
