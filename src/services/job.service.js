const { AppError } = require("../helpers/error");
const { Job } = require("../models");

const getJobs = async () => {
    try {
        const jobs = await Job.findAll();
        return jobs;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createJob = async (data, userReq) => {
    try {
        const job = await Job.findOne({
            where: {
                userId: userReq.id,
                name: data.name
            },
        });

        // job đã tồn tại trong DB
        if (job) {
            throw new AppError(400, "job is existed");
        }

        const createdJob = await Job.create({
            name: data.name,
            userId: userReq.id,
            ...data
        });
        return createdJob;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateJob = async (id, data, userReq) => {
    try {
        const job = await Job.findOne({
            where: {
                id: id,
            },
        });

        const isNameExisted = await Job.findOne({
            where: {
                name: data.name
            }
        })

        if (!job) {
            throw new AppError(400, "Job not found");
        }

        if (userReq.id != job.userId) {
            throw new AppError(403, "You do not have permission to update this job");
        }

        // Kiểm tra xem tên công việc bạn đang update lại có trùng tên với công việc nào bạn đã từng tạo hay không
        if (isNameExisted
            && job.userId == isNameExisted.userId
            && isNameExisted.id != id // check xem có thay đổi name id đang update hay không
        ) {
            throw new AppError(401, "The job name cannot match");
        }

        job.set(data);
        await job.save();

        return job;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteJob = async (id, userReq) => {
    try {
        const job = await Job.findOne({
            where: {
                id,
            },
        });

        if (!job) {
            throw new AppError(400, "Job not found");
        }

        if (userReq.id != job.userId) {
            throw new AppError(403, "You cannot delete this job");
        }

        await Job.destroy({ where: { id } });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getJobById = async (id) => {
    try {
        const job = await Job.findAll({
            where: {
                id,
            }
        });

        if (job.length === 0) {
            throw new AppError(404, "job not found");
        }

        return job;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
};
