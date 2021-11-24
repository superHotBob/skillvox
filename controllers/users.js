// const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

async function create(req, res) {
//   const { email, password } = req.body;

  const user = {
    email: 'bob@tut.by',
    password: '123456',
  };
  const token = jwt.sign({ user }, "yourSecretKey", {
    expiresIn: "24h"
  });
  res.json({
    email: 'bob@tut.by',
    password: '123456',
    jwt: token ,
    message: "create user successfully"
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email
  });

  if (!user) {
    throw Error("User not found");
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user }, "yourSecretKey", {
      expiresIn: "24h"
    });

    res.json({
      user,
      token,
      message: "create user successfully"
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
}

module.exports = {
  create,
  login,
}