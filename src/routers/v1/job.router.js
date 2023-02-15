const express = require("express");
const jobController = require("../../controllers/job.controller")

const jobRouter = express.Router()

jobRouter.get("/", jobController.getJobs())
jobRouter.post("/", jobController.createJob())
jobRouter.put("/:id", jobController.updateJob());
jobRouter.delete("/:id", jobController.deleteJob());
jobRouter.get("/:id", jobController.getJobById());
jobRouter.get("/get/menuJobTypes", jobController.getMenuJobType());
jobRouter.get("/getJobTypeDetail/:jobTypeId", jobController.getJobTypeDetailByJobTypeId());
jobRouter.get("/getJobByJobTypeDetailId/:jobTypeDetailId", jobController.getJobByJobTypeDetailId())


module.exports = jobRouter