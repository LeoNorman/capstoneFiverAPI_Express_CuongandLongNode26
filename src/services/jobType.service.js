const { AppError } = require("../helpers/error");
const { JobType } = require("../models");
const { Op } = require("sequelize");

const findAllWithCondition = async (paging, filter) => {
  try {
    const { count, rows } = await JobType.findAndCountAll({
      where: {
        name: {
          [Op.substring]: filter.name || "",
        },
      },
      offset: (paging.page - 1) * paging.pageSize || 0,
      limit: +paging.pageSize || null,
      order: [["id", "ASC"]],
    });

    // return rows;
    return {
      jobType: rows,
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

const findOneWithCondition = async (condition) => {
  try {
    const jobType = await JobType.findOne({
      where: condition,
    });

    if (!jobType) {
      throw new AppError(404, "User not found");
    }

    return jobType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createJobType = async (data) => {
  try {
    const checkJobType = await JobType.findOne({
      where: {
        name: data.name,
      },
    });

    if (checkJobType) {
      throw new AppError(400, "jobType is existed");
    }

    const createdJobType = await JobType.create(data);
    return createdJobType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateJobType = async (data, id) => {
  try {
    const jobType = await JobType.findByPk(id);

    if (!jobType) {
      throw new AppError(400, "JobType not found");
    }

    const checkjobType = await JobType.findOne({
      where: {
        name: data.name,
      },
    });

    if (checkjobType) {
      throw new AppError(400, "jobType is existed");
    }

    const updatedJobType = await JobType.update(data, {
      where: {
        id,
      },
    });

    return updatedJobType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteJobType = async (id) => {
  try {
    const jobType = await JobType.findByPk(id);

    if (!jobType) {
      throw new AppError(400, "jobType not found");
    }

    return await JobType.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  findAllWithCondition,
  findOneWithCondition,
  createJobType,
  updateJobType,
  deleteJobType,
};
