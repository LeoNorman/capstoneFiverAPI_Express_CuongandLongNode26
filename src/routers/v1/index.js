// Routers V1
const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const jobTypeRouter = require("./jobType.router");
const hireJobRouter = require("./hire-job.router");
const commentRouter = require("./comment.router");
const jobRouter = require("./job.router");

// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho authorization
v1.use("/auth", authRouter);
v1.use("/users", userRouter);
// Định nghĩa các routers cho jobType
v1.use("/job-types", jobTypeRouter);
// Định nghĩa các routers cho hireJob
v1.use("/hire-job", hireJobRouter);

module.exports = v1;
