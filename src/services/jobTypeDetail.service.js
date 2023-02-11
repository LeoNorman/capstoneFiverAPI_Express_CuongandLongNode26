const { AppError } = require("../helpers/error");
const { JobTypeDetail } = require("../models");
const { Op } = require("sequelize");

const createJobTypeDetail = async (data) => {
  try {
    const checkJobTypeDetail = await JobTypeDetail.findOne({
      where: {
        name: data.name,
      },
    });

    if (checkJobTypeDetail) {
      throw new AppError(400, "job type detail is existed");
    }

    const createdJobTypeDetail = await JobTypeDetail.create(data);
    return createdJobTypeDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createJobTypeDetail,
};
