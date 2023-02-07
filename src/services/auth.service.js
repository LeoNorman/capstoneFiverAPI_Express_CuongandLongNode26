const bcrypt = require("bcrypt");
const { User } = require("../models");
const { AppError } = require("../helpers/error");
const { generateToken } = require("../helpers/jwt");

const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const user = await User.findOne({
      where: { email },
      attributes: { include: ["password"] },
    });

    if (!user) {
      throw new AppError(400, "email or password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      throw new AppError(400, "email or password invalid");
    }

    return generateToken(user);
  } catch (error) {
    throw error;
  }
};

const logindemo = async (credentials) => {
  try {
    const { username, password } = credentials;
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      throw new AppError(400, "email or password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      throw new AppError(400, "email or password invalid");
    }

    return generateToken(user);
  } catch (error) {
    throw error;
  }
};

const register = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        username: data.username,
      },
    });

    // Email đã tồn tại trong DB
    if (user) {
      throw new AppError(400, "username is existed");
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

module.exports = {
  login,
  logindemo,
  register,
};
