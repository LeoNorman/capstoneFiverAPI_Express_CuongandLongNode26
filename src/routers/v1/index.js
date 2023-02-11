// Routers V1
const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const jobTyleRouter = require("./jobTyle.router");
const hireJobRouter = require("./hire-job.router");

const authorization = require("../../middlewares/authorization");

const upload = require("../../middlewares/upload");

// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho authorization
v1.use("/auth", authRouter);
// Định nghĩa các routers cho users
v1.use("/users", userRouter);
// Định nghĩa các routers cho jobTyle
v1.use("/jobtyles", jobTyleRouter);
// Định nghĩa các routers cho hireJob
v1.use("/hireJob", hireJobRouter);

module.exports = v1;
