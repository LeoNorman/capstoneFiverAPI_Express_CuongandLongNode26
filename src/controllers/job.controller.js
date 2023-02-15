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

const getJobsWithPagination = () => {
  return async (req, res, next) => {
    try {
      const paging = {
        page: req.query.page,
        pageSize: req.query.pageSize,
      };
      const jobs = await jobService.getJobsWithPagination(paging);
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
      const { user } = res.locals;

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
      const { user } = res.locals;
      const DeletedJob = await jobService.deleteJob(id, user);
      res.status(204).json(response(true));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

const getMenuJobType = () => {
  return async (req, res, next) => {
    try {
      const menuJobTypes = await jobService.getMenuJobType();
      res.status(200).json(response(menuJobTypes));
    } catch (error) {
      next(error);
    }
  };
};

const getJobTypeDetailByJobTypeId = () => {
  return async (req, res, next) => {
    try {
      const { jobTypeId } = req.params;
      const jobTypeDetail = await jobService.getJobTypeDetailByJobTypeId(
        jobTypeId
      );
      if (!jobTypeDetail) {
        throw new AppError(404, "Not Found");
      }
      res.status(200).json(response(jobTypeDetail));
    } catch (error) {
      next(error);
    }
  };
};

const getJobByJobTypeDetailId = () => {
  return async (req, res, next) => {
    try {
      const { jobTypeDetailId } = req.params;
      const jobs = await jobService.getJobByJobTypeDetailId(jobTypeDetailId);
      if (!jobs) {
        throw new AppError(404, "Not Found");
      }
      res.status(200).json(response(jobs));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getJobs,
  getJobsWithPagination,
  createJob,
  updateJob,
  deleteJob,
  getJobById,
  getMenuJobType,
  getJobTypeDetailByJobTypeId,
  getJobByJobTypeDetailId,
};
