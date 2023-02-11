// Controller nhận vào request, response
// Nhiệm vụ: chỉ parse request (params, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ Service và trả response về cho client
const { response } = require("../helpers/response");
const userService = require("../services/user.service");
const fs = require("fs");
const { AppError } = require("../helpers/error");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const paging = {
        page: req.query.page,
        pageSize: req.query.pageSize,
      };
      const filter = {
        role: req.query.role,
        name: req.query.name,
      };
      const users = await userService.findAllWithCondition(paging, filter);
      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

const getUserByIdorName = () => {
  return async (req, res, next) => {
    try {
      const id = req.params;
      const user = await userService.findOneWithCondition(id);
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const file = req.file;
      if (file) {
        if (file.mimetype !== "image/jpeg") {
          fs.unlinkSync(file.path);
          throw new AppError(403, "only image accepted");
        }
        file.path = file.path.replace(/\\/g, "/"); // Đối với window
        data.avatar = file.path;
      }

      const createdUser = await userService.createUser(data);
      res.status(201).json(response(createdUser));
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const { user } = res.locals;
      const file = req.file;
      if (file) {
        if (file.mimetype !== "image/jpeg") {
          fs.unlinkSync(file.path);
          throw new AppError(403, "only image accepted");
        }
        file.path = file.path.replace(/\\/g, "/"); // Đối với window
        data.avatar = file.path;
      }

      if (user.role === "admin" || user.id === id) {
        const updatedUser = await userService.updateUser(data, id);
        res.status(200).json(response(updatedUser));
      } else {
        throw new AppError(403, "No Have Permission");
      }
    } catch (error) {
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(204).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const uploadAvtar = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const file = req.file;
      if (file) {
        if (file.mimetype !== "image/jpeg") {
          fs.unlinkSync(file.path);
          throw new AppError(403, "only image accepted");
        }
        file.path = file.path.replace(/\\/g, "/"); // Đối với window
        user.avatar = file.path;
      }

      throw new AppError(400, "Please upload a file");
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getUsers,
  getUserByIdorName,
  createUser,
  updateUser,
  deleteUser,
  uploadAvtar,
};
