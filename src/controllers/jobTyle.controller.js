const { response } = require("../helpers/response");
const jobTyleService = require("../services/jobTyle.service");
const { AppError } = require("../helpers/error");

const getJobTyle = () => {
  return async (req, res, next) => {
    try {
      const paging = {
        page: req.query.page,
        pageSize: req.query.pageSize,
      };
      const filter = {
        name: req.query.name,
      };
      const jobTyle = await jobTyleService.findAllWithCondition(paging, filter);
      res.status(200).json(response(jobTyle));
    } catch (error) {
      next(error);
    }
  };
};

const getJobTyleByID = () => {
  return async (req, res, next) => {
    try {
      const id = req.params;
      const jobTyle = await jobTyleService.findOneWithCondition(id);
      res.status(200).json(response(jobTyle));
    } catch (error) {
      next(error);
    }
  };
};

const createJobTyle = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      const createdJobTyle = await jobTyleService.createJobTyle(data);
      res.status(201).json(response(createdJobTyle));
    } catch (error) {
      next(error);
    }
  };
};

const updateJobTyle = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      //   const { user } = res.locals;

      const updatedJobTyle = await jobTyleService.updateJobTyle(data, id);
      res.status(200).json(response(updatedJobTyle));

      //   if (user.role === "admin" || user.id === id) {
      //     const updatedJobTyle = await jobTyleService.updateJobTyle(data, id);
      //     res.status(200).json(response(updatedJobTyle));
      //   } else {
      //     throw new AppError(403, "No Have Permission");
      //   }
    } catch (error) {
      next(error);
    }
  };
};

const deleteJobTyle = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await jobTyleService.deleteJobTyle(id);
      res.status(204).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getJobTyle,
  getJobTyleByID,
  createJobTyle,
  updateJobTyle,
  deleteJobTyle,
};
