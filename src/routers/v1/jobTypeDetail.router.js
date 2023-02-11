const express = require("express");
const jobTypeDetailController = require("../../controllers/jobTypeDetail.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requireRole");
const upload = require("../../middlewares/upload");

const jobTypeDetailRouter = express.Router();

jobTypeDetailRouter.post(
  "/",
  authorization,
  requiredRole("admin"),
  upload.single("file"),
  jobTypeDetailController.createJobTypeDetail()
);

module.exports = jobTypeDetailRouter;
