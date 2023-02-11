const express = require("express");
const authController = require("../../controllers/auth.controller");
const userController = require("../../controllers/user.controller");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload");

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("file"),
  userController.createUser()
);
authRouter.post("/login", authController.login());
authRouter.get("/profile", authorization, authController.getProfile());

module.exports = authRouter;
