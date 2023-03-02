const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db");

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        message: "Pseudo déjà pris",
      },
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        message: "Email déjà pris",
      },
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [6, 100],
      },
    },
    user_img: {
      type: DataTypes.ENUM(
        "img1.jpg",
        "img2.jpg",
        "img3.jpg",
        "img4.jpg",
        "img5.jpg",
        "img6.jpg"
      ),
      allowNull: false,
      defaultValue: "img1.jpg",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 255], // le mot de passe doit faire au moins 6 caractères
      },
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    user_saving: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
  }
);

module.exports = User;

//
// password: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   validate: {
//     notEmpty: true,
//     len: [8, 100]
//   },
//   set(value) {
//     // hash le mot de passe avant de l'enregistrer en base de données
//     const hashedPassword = bcrypt.hashSync(value, 10);
//     this.setDataValue('password', hashedPassword);
//   }
// },
