// login@@register
const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// 引入加密
const bcrypt = require("bcrypt");

// $router  get /api/users/test(路由，使用get请求 访问接口/api/users/test)
// @desc  返回的请求的JSON数据
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: "longin works" })
});

// $router  post /api/users/register(路由，使用get请求 访问接口/api/users/register)
// @desc  返回的请求的JSON数据
// @access public
router.post("/register", (req, res) => {
  // console.log(req.body)
  // 查询数据库你是否拥有邮箱
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "邮箱已被注册！" })

      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          // avatar,
          password: req.body.password
        })

        // 加密
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) throw err;
            newUser.password = hash;

            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));

          });
        });
      }

    })

})

module.exports = router;