const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "HireJob",
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
            hiredAt: {
                type: DataTypes.DATE,
                field: "hired_at",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            completed: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            tableName: "hire_job",
            // disable createdAt, updatedAt
            timestamps: false,
        }
    );
};
