const { AppError } = require("../helpers/error");
const { User } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");

const findAllWithCondition = async (paging, filter) => {
  try {
    const { count, rows } = await User.findAndCountAll({
      where: {
        name: {
          [Op.substring]: filter.name || "",
        },
        role: {
          [Op.substring]: filter.role || "",
        },
      },
      offset: (paging.page - 1) * paging.pageSize || 0,
      limit: +paging.pageSize || null,
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
    const user = await User.findOne({
      where: condition,
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    // Email đã tồn tại trong DB
    if (user) {
      throw new AppError(400, "Email is existed");
    }

    if (!data.password) {
      data.password = Math.random().toString(36).substring(2);
    }

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUser = async (data, id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(400, "User not found");
    }

    if (user.avatar && data.avatar) {
      fs.unlinkSync(user.avatar);
    }

    if (data.email) {
      const checkEmail = await User.findOne({
        where: {
          email: data.email,
        },
      });
      if (checkEmail) {
        throw new AppError(400, "Email is existed");
      }
    }

    console.log("data: ", data);
    const updatedUser = await User.update(data, {
      where: {
        id,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(400, "User not found");
    }
    if (user.avatar) {
      fs.unlinkSync(user.avatar);
    }

    await User.destroy({ where: { id } });
    return "user deleted";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  findAllWithCondition,
  findOneWithCondition,
  createUser,
  updateUser,
  deleteUser,
};
