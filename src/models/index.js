// Setup Sequelize
const { Sequelize } = require("sequelize");
const configs = require("../config");

const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
  dialect: configs.DB_DIALECT,
  host: configs.DB_HOST,
  port: configs.DB_PORT,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

// // Khởi tạo model
const User = require("./User")(sequelize);
const Job = require("./Job")(sequelize);
const Comment = require("./Comment")(sequelize);
const HireJob = require("./HireJob")(sequelize);
const JobType = require("./JobType")(sequelize);
const JobTypeDetail = require("./JobTypeDetail")(sequelize);

// // Định nghĩa relationship giữa các model
// User 1 - n Jobs
Job.belongsTo(User, { as: "creator", foreignKey: "userId" });
User.hasMany(Job, { as: "jobs", foreignKey: "userId" });

// JobTypeDetail 1 - n Jobs
Job.belongsTo(JobTypeDetail, { as: "jobTypeDetail", foreignKey: "jobTypeDetailId" });
JobTypeDetail.hasMany(Job, { as: "jobs", foreignKey: "jobTypeDetailId" });

// JobType 1 - n JobTypeDetails
JobTypeDetail.belongsTo(JobType, { as: "jobType", foreignKey: "jobTypeId" });
JobType.hasMany(JobTypeDetail, { as: "jobTypeDetails", foreignKey: "jobTypeId" });

// User 1 - n Comments
// Job 1 - n Comments
User.belongsToMany(Job, {
  as: "jobComments",
  through: Comment,
  foreignKey: "userId",
});
Job.belongsToMany(User, {
  as: "userComments",
  through: Comment,
  foreignKey: "jobId",
});

// User 1 - n HireJobs
// Job 1 - n HireJobs
User.belongsToMany(Job, {
  as: "hireJobs",
  through: HireJob,
  foreignKey: "userId",
});
Job.belongsToMany(User, {
  as: "userHires",
  through: HireJob,
  foreignKey: "jobId",
});

module.exports = {
  sequelize,
  User,
  Job,
  Comment,
  HireJob,
  JobType,
  JobTypeDetail
};
