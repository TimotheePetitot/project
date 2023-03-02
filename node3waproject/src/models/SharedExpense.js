const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Expense = require("./Expense");
const User = require("./User");

const SharedExpense = sequelize.define(
  "SharedExpense",
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
    expense_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Expense",
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
User.belongsToMany(Expense, {
  through: "SharedExpense",
  foreignKey: "user_Id",
  sequelize,
});

Expense.belongsToMany(User, {
  through: "SharedExpense",
  foreignKey: "expense_Id",
  sequelize,
});
module.exports = SharedExpense;
