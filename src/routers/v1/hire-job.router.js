const express = require("express");
const hireJobController = require("../../controllers/hire-job.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requireRole");

const hireJobRouter = express.Router();

hireJobRouter.post("/:jobId", authorization, hireJobController.hireJob());

module.exports = hireJobRouter;
