const { response } = require("../helpers/response");
const jobTypeDetailService = require("../services/jobTypeDetail.service");
const { AppError } = require("../helpers/error");

const createJobTypeDetail = () => {
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
        data.image = file.path;
      }

      const createdJobTypeDetail =
        await jobTypeDetailService.createJobTypeDetail(data);
      res.status(201).json(response(createdJobTypeDetail));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  createJobTypeDetail,
};
