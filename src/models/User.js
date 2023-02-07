const { DataTypes } = require("sequelize");
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
      username: {
        type: DataTypes.STRING(50),
        field: "username",
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING
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
