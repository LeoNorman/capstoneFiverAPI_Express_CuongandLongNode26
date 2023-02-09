const { response } = require("../helpers/response");
const commentService = require("../services/comment.service");

const getComments = () => {
  return async (req, res, next) => {
    try {
      const comments = await commentService.getComments();
      res.status(200).json(response(comments));
    } catch (error) {
      next(error);
    }
  };
};

const getCommentByJobId = () => {
  return async (req, res, next) => {
    try {
      const { jobId } = req.params;
      const comment = await commentService.getCommentByJobId(jobId);
      res.status(200).json(response(comment));
    } catch (error) {
      next(error);
    }
  };
};

const createComment = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const { user } = res.locals;
      const createdComment = await commentService.createComment(data, user);
      res.status(201).json(response(createdComment));
    } catch (error) {
      next(error);
    }
  };
};

const updateComment = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const { user } = res.locals

      const updatedComment = await commentService.updateComment(id, data, user);

      res.status(200).json(response(updatedComment));
    } catch (error) {
      next(error);
    }
  };
};

const deleteComment = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user } = res.locals
      const DeletedComment = await commentService.deleteComment(id, user);
      res.status(204).json(response(true));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

module.exports = {
  getComments,
  getCommentByJobId,
  createComment,
  updateComment,
  deleteComment,
};
