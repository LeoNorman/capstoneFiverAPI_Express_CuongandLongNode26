const bcrypt = require("bcrypt");
const configs = require("../config");
const { AppError } = require("../helpers/error");
const { User } = require("../models");

const saltRounds = Number(configs.SALT_ROUNDS);

const getUsers = async () => {
  try {
    const users = await User.findAll(
    //     {
    //   include: "restaurants",
    // }
    );
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByID = async (id) => {
  try {
    const user = await User.findByPk(id, {
      include: "restaurants",
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

    // Ví dụ trong trường hợp admin thêm user, chỉ cần dùng email, ta cần phải tạo một mật khẩu ngẩu nhiên
    if (!data.password) {
      data.password = Math.random().toString(36).substring(2);
      // Gửi email về cho user mật khẩu này
    }

    //hashpass
    data.password = bcrypt.hashSync(data.password, saltRounds);

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUser = async (id, data, userReq) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });


    if (!user) {
      throw new AppError(400, "User not found");
    }

    if(userReq.id != id) {
      console.log("id: ", id);
      console.log("userReq.id : ", userReq.id );
      throw new AppError(403, "Can't update someone else's account");
    }

    const emailExisted = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if(emailExisted && id != emailExisted.id ) {
      throw new AppError(401, "Email is existed");
    }

    user.set(data);
    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError(400, "User not found");
    }

    await User.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
