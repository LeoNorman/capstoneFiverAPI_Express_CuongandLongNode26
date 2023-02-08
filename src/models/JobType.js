const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "JobType",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            tableName: "job_types",
            // disable createdAt, updatedAt
            timestamps: false,
        }
    );
};
