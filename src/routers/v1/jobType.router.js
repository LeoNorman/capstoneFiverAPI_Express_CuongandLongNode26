const express = require("express");
const jobTypeController = require("../../controllers/jobType.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requireRole");

const jobTypeRouter = express.Router();

jobTypeRouter.get("/", jobTypeController.getJobType());
jobTypeRouter.get("/get-jobType-pagination", jobTypeController.getJobType());
jobTypeRouter.get("/:id", jobTypeController.getJobTypeByID());
jobTypeRouter.put("/:id", authorization, jobTypeController.updateJobType());
jobTypeRouter.post(
  "/",
  authorization,
  requiredRole("admin"),
  jobTypeController.createJobType()
);
jobTypeRouter.delete(
  "/:id",
  authorization,
  requiredRole("admin"),
  jobTypeController.deleteJobType()
);

module.exports = jobTypeRouter;
