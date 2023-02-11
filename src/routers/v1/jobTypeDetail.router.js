const express = require("express");
const jobTypeDetailController = require("../../controllers/jobTypeDetail.controller")

const jobTypeDetailRouter = express.Router()

jobTypeDetailRouter.get("/", jobTypeDetailController.getJobTypeDetails())
jobTypeDetailRouter.post("/", jobTypeDetailController.createJobTypeDetail())
jobTypeDetailRouter.put("/:id", jobTypeDetailController.updateJobTypeDetail());
jobTypeDetailRouter.delete("/:id", jobTypeDetailController.deleteJobTypeDetail());
jobTypeDetailRouter.get("/:id", jobTypeDetailController.getJobTypeDetailById());

module.exports = jobTypeDetailRouter

