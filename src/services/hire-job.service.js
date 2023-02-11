const { AppError } = require("../helpers/error");
const { Op } = require("sequelize");
const fs = require("fs");
const { Job, HireJob } = require("../models");

const hireJob = async (userId, jobId) => {
  try {
    const job = await Job.findByPk(jobId);

    // Email đã tồn tại trong DB
    if (!job) {
      throw new AppError(400, "job not found");
    }

    console.log(job.__proto__);

    // const hiredJob = await HireJob.create(data);
    // return hiredJob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  hireJob,
};
