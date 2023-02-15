const express = require("express");
const userController = require("../../controllers/user.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requireRole");
const upload = require("../../middlewares/upload");

const userRouter = express.Router();

userRouter.get("/", userController.getUsers());
userRouter.get("/get-user-pagination", userController.getUsers());
userRouter.get("/:id", userController.getUserByIdorName());
userRouter.get("/search/:name", userController.getUserByIdorName());
userRouter.post(
  "/",
  authorization,
  requiredRole("admin"),
  upload.single("file"),
  userController.createUser()
);
userRouter.put(
  "/:id",
  authorization,
  upload.single("file"),
  userController.updateUser()
);
userRouter.delete(
  "/:id",
  authorization,
  requiredRole("admin"),
  userController.deleteUser()
);
userRouter.post(
  "/upload-avatar",
  authorization,
  upload.single("file"),
  userController.uploadAvatar()
);

module.exports = userRouter;
