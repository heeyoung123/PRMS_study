const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT);

const userRouter = require("./routes/users");
const userRouter = require("./routes/books");
const userRouter = require("./routes/likes");
const userRouter = require("./routes/carts");
const userRouter = require("./routes/orders");

app.use("/users", userRouter);
app.use("/books", userRouter);
app.use("/carts", userRouter);
app.use("/likes", userRouter);
app.use("/orders", userRouter);
