const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const SavingsGoal = require("./SavingsGoal");
const User = require("./User");

const SavingsGoalUser = sequelize.define(
  "SavingsGoalUser",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
    savings_Goal_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: "SavingsGoal",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.belongsToMany(SavingsGoal, {
  through: "SavingsGoalUser",
  foreignKey: "user_Id",
  sequelize,
});

SavingsGoal.belongsToMany(User, {
  through: "SavingsGoalUser",
  foreignKey: "savings_Goal_Id",
  sequelize,
});
module.exports = SavingsGoalUser;
