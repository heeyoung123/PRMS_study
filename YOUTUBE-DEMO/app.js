const express = require("express");
const app = express();
app.listen(7777);

//user-demo, channel-demo가져오는법
//모듈로 만들어서 가져온다
const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");
app.use("/", userRouter);
app.use("/channels", channelRouter);
