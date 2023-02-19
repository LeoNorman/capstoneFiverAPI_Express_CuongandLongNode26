const { AppError } = require("../helpers/error");
const { Op } = require("sequelize");
const fs = require("fs");
const { HireJob } = require("../models");

const findAllWithCondition = async (paging) => {
  try {
    const { count, rows } = await HireJob.findAndCountAll({
      offset: (paging.page - 1) * paging.pageSize || 0,
      limit: +paging.pageSize || null,
    });

    return {
      hiredJob: rows,
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
    const hiredJob = await HireJob.findOne({
      where: condition,
    });

    if (!hiredJob) {
      throw new AppError(404, "hiredJob not found");
    }

    return hiredJob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getHiredJobByUserId = async (userId) => {
  try {
    const hiredJob = await HireJob.findAll({
      where: { userId },
    });

    if (!hiredJob) {
      throw new AppError(404, "hiredJobs not found");
    }

    return hiredJob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const hireJob = async (data) => {
  try {
    const job = await HireJob.findOne({
      where: {
        jobId: data.jobId,
        userId: data.userId,
      },
    });

    if (job) {
      throw new AppError(400, "job already hired by you");
    }

    // console.log(job.__proto__);

    const hiredJob = await HireJob.create(data);
    return hiredJob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateHiredJob = async (data, id) => {
  try {
    const hiredJob = await HireJob.findByPk(id);

    if (!hiredJob) {
      throw new AppError(400, "User not found");
    }

    const updatedHiredJob = await HireJob.update(data, {
      where: {
        id,
      },
    });

    return updatedHiredJob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const completeJobById = async (id) => {
  try {
    const hiredJob = await HireJob.findOne({
      where: { id },
    });

    if (!hiredJob) {
      throw new AppError(404, "hiredJobs abc");
    }

    const updatedHiredJob = await HireJob.update(
      { completed: true },
      {
        where: {
          id,
        },
      }
    );

    return hiredJob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  findAllWithCondition,
  findOneWithCondition,
  getHiredJobByUserId,
  hireJob,
  updateHiredJob,
  completeJobById,
};
