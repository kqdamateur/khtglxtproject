// 引入express
const express = require("express");

// 引入mongoose
const mongoose = require("mongoose");
// 实例化
const app = express();
// DB config
const db = require("./config/keys").mongoURL;
// connect to mongodb
// const dbURL = "mongodb://127.0.0.1:27017/nodeapi";
mongoose.connect(db)

    .then(() => console.log("mongodb connect"))
    .catch(err => console.log(err))

// 设置路由
app.get("/", (req, res) => {
    res.send("Hello World!");
})
// 设置端口号
const port = process.env.PORT || 5000;
// 监听
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})