const express = require("express");
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const userRouter = require('./routes/users');
require("./db");

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

app.use("/images", express.static(path.join(__dirname, 'uploads')))

// app.use((req, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin', '*')
//  res.setHeader('Access-Control-Allow-Methods', 'POST', 'GET')
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//  res.setHeader('Access-Control-Allow-Credentials', true)
//  next()
// })


app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use('/api/users', userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started in port ", PORT);
});
