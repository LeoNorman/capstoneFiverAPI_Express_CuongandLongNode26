const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "JobTypeDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: "name",
      },
      image: {
        type: DataTypes.STRING,
      },
      jobTypeId: {
        type: DataTypes.INTEGER,
        field: "job_type_id",
      },
    },
    {
      tableName: "job_type_detail",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
