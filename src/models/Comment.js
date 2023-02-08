const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      jobId: {
        type: DataTypes.INTEGER,
        field: "job_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      commentedAt: {
        type: DataTypes.DATE,
        field: "commented_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentStar: {
        type: DataTypes.INTEGER,
        field: "comment_star",
      }
    },
    {
      tableName: "comments",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
