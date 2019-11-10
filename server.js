const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRouter");
const pinRouter = require("./routes/pinRouter");

const app = express();

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
app.use("/pins", pinRouter);

const { port } = require("./config/config");

app.listen(port, () => console.log(`Server started on ${port}`));
