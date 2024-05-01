const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const http = require("http");
const socketIO = require("socket.io");
const { addUser, removeUser } = require("./ws/index");
require("dotenv").config();
const morgan = require("morgan");

const notificationsRouter = require("./routes/notifications");
const notFound = require("./middlewares/notFound");
require("./db");

const app = express();

const Server = http.createServer(app);

const io = socketIO(Server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("joined", (data) => {
    addUser(data, socket.id);
  });

    socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    removeUser(socket.id)
  });
});

const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.io = io;
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));
}
app.use("/images", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  console.log("created uploads folder");
  fs.mkdirSync(path.join(__dirname, "uploads"));
}

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/notifications", notificationsRouter);

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const obj = {
    success: false,
    status,
    message,
  };

  if(process.env.NODE_ENV !== 'production') obj['stack'] = err.stack

  res.status(status).send(obj);
});

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


app.use(notFound);


// module.exports = app

const PORT = process.env.PORT || 5000;

Server.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV}  `, PORT);
});
