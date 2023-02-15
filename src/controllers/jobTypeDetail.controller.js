const { response } = require("../helpers/response");
const jobTypeDetailService = require("../services/jobTypeDetail.service");

const getJobTypeDetails = () => {
  return async (req, res, next) => {
    try {
      const jobTypeDetails = await jobTypeDetailService.getJobTypeDetails();
      res.status(200).json(response(jobTypeDetails));
    } catch (error) {
      next(error);
    }
  };
};

const getJobTypeDetailsWithPagination = () => {
  return async (req, res, next) => {
    try {
      const paging = {
        page: req.query.page,
        pageSize: req.query.pageSize,
      };
      const jobsTypeDetails =
        await jobTypeDetailService.getJobTypeDetailsWithPagination(paging);
      res.status(200).json(response(jobsTypeDetails));
    } catch (error) {
      next(error);
    }
  };
};

const getJobTypeDetailById = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const jobTypeDetail = await jobTypeDetailService.getJobTypeDetailById(id);
      res.status(200).json(response(jobTypeDetail));
    } catch (error) {
      next(error);
    }
  };
};

const createJobTypeDetail = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdJobTypeDetail =
        await jobTypeDetailService.createJobTypeDetail(data);
      res.status(201).json(response(createdJobTypeDetail));
    } catch (error) {
      next(error);
    }
  };
};

const updateJobTypeDetail = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedJobTypeDetail =
        await jobTypeDetailService.updateJobTypeDetail(id, data);

      res.status(200).json(response(updatedJobTypeDetail));
    } catch (error) {
      next(error);
    }
  };
};

const deleteJobTypeDetail = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const DeletedJobTypeDetail =
        await jobTypeDetailService.deleteJobTypeDetail(id);
      res.status(204).json(response(true));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

module.exports = {
  getJobTypeDetails,
  getJobTypeDetailsWithPagination,
  createJobTypeDetail,
  updateJobTypeDetail,
  deleteJobTypeDetail,
  getJobTypeDetailById,
};
