const { response } = require("../helpers/response");
const jobService = require("../services/job.service");

const getJobs = () => {
  return async (req, res, next) => {
    try {
      const jobs = await jobService.getJobs();
      res.status(200).json(response(jobs));
    } catch (error) {
      next(error);
    }
  };
};

const getJobById = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const job = await jobService.getJobById(id);
      res.status(200).json(response(job));
    } catch (error) {
      next(error);
    }
  };
};

const createJob = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const { user } = res.locals;
      const createdJob = await jobService.createJob(data, user);
      res.status(201).json(response(createdJob));
    } catch (error) {
      next(error);
    }
  };
};

const updateJob = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const { user } = res.locals

      const updatedJob = await jobService.updateJob(id, data, user);

      res.status(200).json(response(updatedJob));
    } catch (error) {
      next(error);
    }
  };
};

const deleteJob = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user } = res.locals
      const DeletedJob = await jobService.deleteJob(id, user);
      res.status(204).json(response(true));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobById,
};
