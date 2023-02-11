const express = require("express");
const commentController = require("../../controllers/comment.controller")

const commentRouter = express.Router()

commentRouter.get("/", commentController.getComments())
commentRouter.post("/", commentController.createComment())
commentRouter.put("/:id", commentController.updateComment());
commentRouter.delete("/:id", commentController.deleteComment());
commentRouter.get("/:jobId", commentController.getCommentByJobId());


module.exports = commentRouter