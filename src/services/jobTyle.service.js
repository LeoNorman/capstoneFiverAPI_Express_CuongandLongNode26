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
      users: rows,
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
    const jobTyle = await JobType.findOne({
      where: condition,
    });

    if (!jobTyle) {
      throw new AppError(404, "User not found");
    }

    return jobTyle;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createJobTyle = async (data) => {
  try {
    const checkJobTyle = await JobType.findOne({
      where: {
        name: data.name,
      },
    });

    if (checkJobTyle) {
      throw new AppError(400, "jobTyle is existed");
    }

    const createdJobTyle = await JobType.create(data);
    return createdJobTyle;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateJobTyle = async (data, id) => {
  try {
    const jobTyle = await JobType.findByPk(id);

    if (!jobTyle) {
      throw new AppError(400, "JobTyle not found");
    }

    const checkjobTyle = await JobType.findOne({
      where: {
        name: data.name,
      },
    });

    if (checkjobTyle) {
      throw new AppError(400, "jobTyle is existed");
    }

    const updatedJobTyle = await JobType.update(data, {
      where: {
        id,
      },
    });

    return updatedJobTyle;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteJobTyle = async (id) => {
  try {
    const jobTyle = await JobType.findByPk(id);

    if (!jobTyle) {
      throw new AppError(400, "jobTyle not found");
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
  createJobTyle,
  updateJobTyle,
  deleteJobTyle,
};
