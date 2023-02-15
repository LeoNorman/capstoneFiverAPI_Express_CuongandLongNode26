const { response } = require("../helpers/response");
const hireJobService = require("../services/hire-job.service");
const { AppError } = require("../helpers/error");

const getHiredJob = () => {
  return async (req, res, next) => {
    try {
      const paging = {
        page: req.query.page,
        pageSize: req.query.pageSize,
      };
      const hiredJob = await hireJobService.findAllWithCondition(paging);
      res.status(200).json(response(hiredJob));
    } catch (error) {
      next(error);
    }
  };
};

const getHiredJobByID = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const id = req.params;
      if (user.role === "admin" || user.id === id) {
        const hiredJob = await hireJobService.findOneWithCondition(id);
        res.status(200).json(response(hiredJob));
      } else {
        throw new AppError(403, "No Have Permission");
      }
      // const hiredJob = await hireJobService.findOneWithCondition(id);
      // res.status(200).json(response(hiredJob));
    } catch (error) {
      next(error);
    }
  };
};

const getHiredJobByUserId = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;

      const hiredJob = await hireJobService.getHiredJobByUserId(user.id);
      res.status(200).json(response(hiredJob));
    } catch (error) {
      next(error);
    }
  };
};

const hireJob = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const { user } = res.locals;
      data.userId = user.id;
      const hiredJob = await hireJobService.hireJob(data);
      res.status(200).json(response(hiredJob));
    } catch (error) {
      next(error);
    }
  };
};

const updateHireJob = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const { user } = res.locals;

      if (user.role === "admin" || user.id === id) {
        const updatedHiredJob = await hireJobService.updateHiredJob(data, id);
        res.status(200).json(response(updatedHiredJob));
      } else {
        throw new AppError(403, "No Have Permission");
      }
    } catch (error) {
      next(error);
    }
  };
};

const completeJobById = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      if (user.role === "admin" || user.id === id) {
        await hireJobService.completeJobById(id);
        res.status(200).json(response("OK"));
      } else {
        throw new AppError(403, "No Have Permission");
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getHiredJob,
  getHiredJobByID,
  getHiredJobByUserId,
  hireJob,
  updateHireJob,
  completeJobById,
};
