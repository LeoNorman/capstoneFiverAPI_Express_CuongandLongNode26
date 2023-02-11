// Routers V1
const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const commentRouter = require("./comment.router");
const jobRouter = require("./job.router");

const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload");
const jobTypeDetailRouter = require("./jobTypeDetail.router");



// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho authorization
v1.use("/auth", authRouter);
// Định nghĩa các routers cho users
v1.use("/users", authorization, userRouter);
// Định nghĩa các routers cho comments
v1.use("/comments", authorization, commentRouter);
// Định nghĩa các routers cho jobs
v1.use("/jobs", authorization, jobRouter);
// Định nghĩa các routers cho jobTypeDetails
v1.use("/jobTypeDetails", authorization, jobTypeDetailRouter);


module.exports = v1;
