const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Expense = require("./Expense");
const SavingsGoal = require("./SavingsGoal");

const ExpenseSavingsGoal = sequelize.define(
  "ExpenseSavingsGoal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    // amount: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    // },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
Expense.belongsToMany(SavingsGoal, {
  through: "ExpenseSavingsGoal",
  foreignKey: "expense_Id",
  sequelize,
}),
  SavingsGoal.belongsToMany(Expense, {
    through: "ExpenseSavingsGoal",
    foreignKey: "savings_Goal_Id",
    sequelize,
  });

module.exports = ExpenseSavingsGoal;
