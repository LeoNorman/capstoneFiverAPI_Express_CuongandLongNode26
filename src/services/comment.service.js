const { AppError } = require("../helpers/error");
const { Comment } = require("../models");

const getComments = async () => {
    try {
        const comments = await Comment.findAll();
        return comments;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getCommentByJobId = async (jobId) => {
    try {
        const comment = await Comment.findAll({
            where: {
                jobId,
            }
        });

        if (!comment) {
            throw new AppError(404, "comment not found");
        }

        return comment;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createComment = async (data, userReq) => {
    try {
        const comment = await Comment.findOne({
            where: {
                jobId: data.jobId,
                userId: userReq.id
            },
        });

        // comment đã tồn tại trong DB
        if (comment) {
            throw new AppError(400, "comment is existed");
        }

        const createdComment = await Comment.create({
            jobId: data.jobId,
            userId: userReq.id,
            content: data.content,
            ...data
        });
        return createdComment;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateComment = async (id, data, userReq) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: id,
            },
        });


        if (!comment) {
            throw new AppError(400, "Comment not found");
        }

        if (userReq.id != data.userId || comment.jobId != data.jobId) {
            throw new AppError(403, "Can't update someone else's comment");
        }

        comment.set(data);
        await comment.save();

        return comment;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteComment = async (id, userReq) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id,
            },
        });

        if (!comment) {
            throw new AppError(400, "comment not found");
        }

        if (userReq.id != comment.userId) {
            throw new AppError(403, "You cannot delete this comment");
        }

        await Comment.destroy({ where: { id } });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    getComments,
    getCommentByJobId,
    createComment,
    updateComment,
    deleteComment,
};
