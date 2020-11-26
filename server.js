const express = require("express");
const path = require("path");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

const users = [];

const userMaintain = (id, name, type) => {
  let flag = false;
  if (type === "host") {
    users.push({
      id: id,
      host: name,
      join: null,
    });
    flag = true;
  } else if (type === "join") {
    users.map((user) => {
      if (user.id === id && user.join === null) {
        user.join = name;
        flag = true;
      }
      return user;
    });
  }
  return flag;
};

io.on("connection", (socket) => {
  socket.on("user-connection", ({ id, name, type }) => {
    if (userMaintain(id, name, type)) {
      socket.join(id);
      io.to(id).emit("opposite-user", {
        oppositeUser: users.filter((e) => id == e.id)[0],
      });
    } else {
      socket.emit("warning-msg", {
        msg: "Room is already taken",
      });
    }
  });

  socket.on("send-number", ({ number, id }) => {
    socket.to(id).emit("number-receive", { number });
  });

  socket.on("winner", ({ id, name }) => {
    console.log(name);
    io.to(id).emit("finish-game", { name });
  });

  socket.on("disconnect", () => {});
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.use(express.static(path.join(__dirname, "/client/build")));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("server up and running");
});
