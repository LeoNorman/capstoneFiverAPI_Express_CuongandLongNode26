const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Job",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        }
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
            min: 100,
            max: 10000,
        }
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      shortDescription: {
        type: DataTypes.STRING,
        field: "short_description"
      },
      jobStar: {
        type: DataTypes.INTEGER,
        field: "job_star"
      },
      jobTypeDetailId: {
        type: DataTypes.INTEGER,
        field: "job_type_detail_id"
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id"
      }
    },
    {
      tableName: "jobs",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
