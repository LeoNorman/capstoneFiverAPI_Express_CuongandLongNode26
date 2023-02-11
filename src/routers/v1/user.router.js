const express = require("express");
const userController = require("../../controllers/user.controller");
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requireRole");
const upload = require("../../middlewares/upload");

const userRouter = express.Router();

userRouter.get("/", userController.getUsers());
userRouter.get("/get-user-pagination", userController.getUsers());
userRouter.get("/:id", userController.getUserByID());
userRouter.get("/search/:name", userController.getUserByName());
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
  "/",
  authorization,
  upload.single("file"),
  userController.uploadAvtar()
);

module.exports = userRouter;
