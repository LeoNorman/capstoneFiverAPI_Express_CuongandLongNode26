const { response } = require("../helpers/response");
const jobTypeService = require("../services/jobType.service");
const { AppError } = require("../helpers/error");

const getJobType = () => {
  return async (req, res, next) => {
    try {
      const paging = {
        page: req.query.page,
        pageSize: req.query.pageSize,
      };
      const filter = {
        name: req.query.name,
      };
      const jobType = await jobTypeService.findAllWithCondition(paging, filter);
      res.status(200).json(response(jobType));
    } catch (error) {
      next(error);
    }
  };
};

const getJobTypeByID = () => {
  return async (req, res, next) => {
    try {
      const id = req.params;
      const jobType = await jobTypeService.findOneWithCondition(id);
      res.status(200).json(response(jobType));
    } catch (error) {
      next(error);
    }
  };
};

const createJobType = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      const createdJobType = await jobTypeService.createJobType(data);
      res.status(201).json(response(createdJobType));
    } catch (error) {
      next(error);
    }
  };
};

const updateJobType = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      //   const { user } = res.locals;

      const updatedJobType = await jobTypeService.updateJobType(data, id);
      res.status(200).json(response(updatedJobType));

      //   if (user.role === "admin" || user.id === id) {
      //     const updatedJobType = await jobTypeService.updateJobType(data, id);
      //     res.status(200).json(response(updatedJobType));
      //   } else {
      //     throw new AppError(403, "No Have Permission");
      //   }
    } catch (error) {
      next(error);
    }
  };
};

const deleteJobType = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await jobTypeService.deleteJobType(id);
      res.status(204).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getJobType,
  getJobTypeByID,
  createJobType,
  updateJobType,
  deleteJobType,
};
