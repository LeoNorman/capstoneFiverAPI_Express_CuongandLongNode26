const { response } = require("../helpers/response");
const hireJobService = require("../services/hire-job.service");
const { AppError } = require("../helpers/error");

const hireJob = () => {
  return async (req, res, next) => {
    try {
      const { jobId } = req.params;
      const { user } = res.locals;
      //   await hireJobService.hireJob(user.id, jobId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  hireJob,
};
