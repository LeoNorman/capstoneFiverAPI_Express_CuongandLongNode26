const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: {
            msg: "invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
      },
      role: {
        type: Sequelize.ENUM("user", "admin"),
      },
      skill: {
        type: DataTypes.STRING,
      },
      certification: {
        type: DataTypes.STRING,
      }
    },
    {
      tableName: "users",
      // disable createdAt, updatedAt
      timestamps: false,
      // Bỏ qua cái column password khi tìm kiếm các record
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      // Các phương thức được tự động chạy sau một hành động(create/update/delete)
      hooks: {
        // Xoá property password của record được trả ra sau khi create/update thành công
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
