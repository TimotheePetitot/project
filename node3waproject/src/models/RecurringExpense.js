const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db");
const Expense = require("./expense");

const RecurringExpense = db.define(
  "RecurringExpense",
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    expense_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    frequency: {
      type: DataTypes.ENUM("daily", "weekly", "monthly", "annually"),
      allowNull: false,
      validate: {
        isValidFrequency(value) {
          const validFrequencies = ["daily", "weekly", "monthly", "annually"];
          if (!validFrequencies.includes(value)) {
            throw new Error("Invalid frequency");
          }
        },
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
  }
);

RecurringExpense.belongsTo(Expense);

module.exports = RecurringExpense;
