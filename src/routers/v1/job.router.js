const express = require("express");
const jobController = require("../../controllers/job.controller")

const jobRouter = express.Router()

jobRouter.get("/", jobController.getJobs())
jobRouter.post("/", jobController.createJob())
jobRouter.put("/:id", jobController.updateJob());
jobRouter.delete("/:id", jobController.deleteJob());
jobRouter.get("/:id", jobController.getJobById());

module.exports = jobRouter