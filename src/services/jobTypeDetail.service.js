const { AppError } = require("../helpers/error");
const { JobTypeDetail, JobType } = require("../models");

const getJobTypeDetails = async () => {
  try {
    const jobTypeDetails = await JobTypeDetail.findAll();
    return jobTypeDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getJobTypeDetailsWithPagination = async (paging) => {
  try {
    const { count, rows } = await JobTypeDetail.findAndCountAll({
      offset: (paging.page - 1) * paging.pageSize || 0,
      limit: +paging.pageSize || null,
    });
    return {
      jobtypedetails: rows,
      paging: {
        count,
        page: paging.page || 1,
        pageSize: paging.pageSize,
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createJobTypeDetail = async (data, userReq) => {
  try {
    const jobTypeDetail = await JobTypeDetail.findOne({
      where: {
        name: data.name,
      },
    });

    const checkJobType = await JobType.findOne({
      where: {
        id: data.jobTypeId,
      },
    });

    if (!checkJobType) {
      throw new AppError(401, "Job type not found");
    }

    // name đã tồn tại trong DB
    if (jobTypeDetail) {
      throw new AppError(400, "name is existed");
    }

    const createdJob = await JobTypeDetail.create(data);
    return createdJob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateJobTypeDetail = async (id, data) => {
  try {
    const jobTypeDetail = await JobTypeDetail.findOne({
      where: {
        id,
      },
    });

    const jobType = await JobType.findOne({
      where: {
        id: data.jobTypeId,
      },
    });

    const isNameExisted = await JobTypeDetail.findOne({
      where: {
        name: data.name,
      },
    });

    if (!jobTypeDetail) {
      throw new AppError(400, "Job Type Detail not found");
    }

    if (!jobType) {
      throw new AppError(400, "Job Type not found");
    }

    if (isNameExisted && isNameExisted.id != id) {
      throw new AppError(401, "name already exists");
    }

    jobTypeDetail.set(data);
    await jobTypeDetail.save();

    return jobTypeDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteJobTypeDetail = async (id) => {
  try {
    const jobTypeDetail = await JobTypeDetail.findOne({
      where: {
        id,
      },
    });

    if (!jobTypeDetail) {
      throw new AppError(400, "Job Type Detail not found");
    }

    await JobTypeDetail.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getJobTypeDetailById = async (id) => {
  try {
    const jobTypeDetail = await JobTypeDetail.findAll({
      where: {
        id,
      },
    });

    if (jobTypeDetail.length === 0) {
      throw new AppError(404, "job type detail not found");
    }

    return jobTypeDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getJobTypeDetails,
  getJobTypeDetailsWithPagination,
  createJobTypeDetail,
  updateJobTypeDetail,
  deleteJobTypeDetail,
  getJobTypeDetailById,
};
