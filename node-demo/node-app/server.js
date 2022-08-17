// 引入express
const express = require("express");

// 引入mongoose
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
// 实例化
const app = express();
//引入users.js
const users = require("./routes/api/users");

// DB config
const db = require("./config/keys").mongoURL;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// connect to mongodb
// const dbURL = "mongodb://127.0.0.1:27017/nodeapi";
mongoose.connect(db)

    .then(() => console.log("mongodb connect"))
    .catch(err => console.log(err))

// 设置路由
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// 使用router
app.use("/api/users", users);
// 设置端口号
const port = process.env.PORT || 5000;
// 监听
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})