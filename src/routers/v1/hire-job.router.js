const express = require("express");
const hireJobController = require("../../controllers/hire-job.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requireRole");

const hireJobRouter = express.Router();

hireJobRouter.get("/", authorization, hireJobController.getHiredJob());
hireJobRouter.get(
  "/get-hiredJob-pagination",
  authorization,
  hireJobController.getHiredJob()
);
hireJobRouter.get(
  "/get-hiredjob-by-user",
  authorization,
  hireJobController.getHiredJobByUserId()
);
hireJobRouter.get("/:id", authorization, hireJobController.getHiredJobByID());
hireJobRouter.put("/:id", authorization, hireJobController.updateHireJob());
hireJobRouter.post(
  "/complete-job/:id",
  authorization,
  hireJobController.completeJobById()
);
hireJobRouter.post("/:jobId", authorization, hireJobController.hireJob());

module.exports = hireJobRouter;
