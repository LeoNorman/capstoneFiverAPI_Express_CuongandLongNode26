const express = require("express");
const jobTyleController = require("../../controllers/jobTyle.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requireRole");

const jobTyleRouter = express.Router();

jobTyleRouter.get("/", jobTyleController.getJobTyle());
jobTyleRouter.get("/get-jobtyle-pagination", jobTyleController.getJobTyle());
jobTyleRouter.get("/:id", jobTyleController.getJobTyleByID());
jobTyleRouter.put("/:id", authorization, jobTyleController.updateJobTyle());
jobTyleRouter.post(
  "/",
  authorization,
  requiredRole("admin"),
  jobTyleController.createJobTyle()
);
jobTyleRouter.delete(
  "/:id",
  authorization,
  requiredRole("admin"),
  jobTyleController.deleteJobTyle()
);

module.exports = jobTyleRouter;
