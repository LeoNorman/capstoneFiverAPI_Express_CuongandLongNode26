// Routers V1
const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");

const authorization = require("../../middlewares/authorization");

const upload = require("../../middlewares/upload");


// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho authorization
v1.use("/auth", authRouter);
// Định nghĩa các routers cho users
v1.use("/users", authorization, userRouter);


module.exports = v1;
