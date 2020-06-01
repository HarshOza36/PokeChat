//Import Modules

const http = require("http");
const express = require("express");
const path = require("path");
const socketio = require("socket.io");

//Custom imports

const formatMsg = require("./utils/msgs");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

//Initialize app, server and socket

const app = express();
const server = http.createServer(app);
const sio = socketio(server);

//Set up static folder

app.use(express.static(path.join(__dirname, "static")));

const botName = "Nurse Joy";

//Connect socket when client connects
sio.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit("msg", formatMsg(botName, "!!Welcome to PokeChat!!")); //Client Log Welcome

    //Add Users in room sidebar
    sio.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    //Since it a chat with many people and not one to one we need to broadcast to all users
    //Client broadcast - Connect Message
    socket.broadcast
      .to(user.room)
      .emit("msg", formatMsg(botName, `${user.username} has joined the Chat`));
  });

  //Listen the message
  socket.on("chatMsg", (msg) => {
    //and show the message
    const user = getCurrentUser(socket.id);
    sio.to(user.room).emit("msg", formatMsg(user.username, msg));
  });

  //Client - Disconnect Message
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      sio
        .to(user.room)
        .emit("msg", formatMsg(botName, `${user.username} has left the chat`));

      //Update Users in room sidebar
      sio.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers,
      });
    }
  });
});

const PORT = 5013 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
