const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRouter");
//const pinRouter = require("./routes/pinRouter");
//const socketController = require("./controllers/socketController");
const app = express();
const server = http.createServer(app);

const socketio = require("socket.io");

io = socketio(server);

//Connect to database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
dotenv.config();
app.use(cors());

//Define Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
//app.use("/pins", pinRouter);

const { port } = require("./config/config");

io.on("connection", async function(socket) {
  console.log("connected");
});

server.listen(port, () => console.log(`Server started on ${port}`));

module.exports = server;
