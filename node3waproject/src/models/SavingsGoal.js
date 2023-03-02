const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const SavingsGoal = sequelize.define(
  "SavingsGoal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    goal_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goal_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goal_img: {
      type: DataTypes.ENUM(
        "Alimentation.jpg",
        "Transport.jpg",
        "Logement.jpg",
        "Loisir.jpg",
        "Travail.jpg",
        "Autre.jpg"
      ),
      allowNull: false,
      defaultValue: "Autre.jpg",
    },
    goal_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    goal_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    goal_total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    goal_saving_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = SavingsGoal;
