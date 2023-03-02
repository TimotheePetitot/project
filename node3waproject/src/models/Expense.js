const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const RecurringExpense = require("./RecurringExpense");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    expense_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expense_type: {
      type: DataTypes.ENUM(
        "Alimentation",
        "Transport",
        "Logement",
        "Loisir",
        "Travail",
        "Autre"
      ),
      allowNull: false,
    },
    expense_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    purchased_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  {
    recurring_Expense_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: RecurringExpense,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: true,
    },
  }
);

module.exports = Expense;
