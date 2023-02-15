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
        allowNull: true,
        set(value) {
          // Không được lưu plaintext password trực tiếp xuống DB
          // Ta cần hash password bằng thư viện bcrypt
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);

          this.setDataValue("password", hashedPassword);
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "must be number",
          },
          len: {
            args: [10, 10],
            msg: "phonenumber must be 10 digits",
          },
        },
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: {
            msg: "birthday must be date format MM/DD/YYYY",
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
      },
      role: {
        type: Sequelize.ENUM("user", "admin"),
        defaultValue: "user",
      },
      skill: {
        type: DataTypes.STRING,
      },
      certification: {
        type: DataTypes.STRING,
      },
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
