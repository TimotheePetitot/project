const express = require("express");
const app = express();
const db = require("./src/db/db");
const bodyParser = require("body-parser");

const User = require("./src/models/User");
const Expense = require("./src/models/Expense");
const RecurringExpense = require("./src/models/RecurringExpense");
const SavingsGoal = require("./src/models/SavingsGoal");
const ExpenseSavingsGoal = require("./src/models/ExpenseSavingsGoal");
const SavingsGoalUser = require("./src/models/SavingsGoalUser");
const SharedExpense = require("./src/models/SharedExpense");

const helmet = require("helmet");
const cors = require("cors");

const allowedOrigins = ["*"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origine non autorisée par CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app
  .use(bodyParser.json())
  //helmet -> middleware pour aider a proteger contre les injections de script, les attaques XSS, les en-têtes HTTP malveillants, etc.
  .use(helmet())
  //delimite l'acces aux endpoints
  .use(cors());

//path for test auth and token (jwt)
require("./src/routes/test")(app);
//path crud User
require("./src/routes/User/login")(app, User);
require("./src/routes/User/addUser")(app, User);
require("./src/routes/User/deleteUser")(app, User);
require("./src/routes/User/updateUser")(app, User);
//path crud Expense
// require("./src/routes/Expense/addExpense")(app, Expense);
// require("./src/routes/Expense/findAllExpense")(app, Expense);
// require("./src/routes/Expense/findByPkExpense")(app, Expense);
// require("./src/routes/Expense/destroyExpense")(app, Expense);
// require("./src/routes/Expense/updateExpense")(app, Expense);
// require("./src/routes/Expense/activeOrInactiveExpense")(app, Expense);
//path crud RecurringExpense
// require("./src/routes/RecurringExpense/addRecurringExpense")(
//   app,
//   RecurringExpense
// );
// require("./src/routes/RecurringExpense/findAllRecurringExpense")(
//   app,
//   RecurringExpense
// );
// require("./src/routes/RecurringExpense/findByPkRecurringExpense")(
//   app,
//   RecurringExpense
// );
// require("./src/routes/RecurringExpense/destroyRecurringExpense")(
//   app,
//   RecurringExpense
// );
// require("./src/routes/RecurringExpense/updateRecurringExpense")(
//   app,
//   RecurringExpense
// );
// require("./src/routes/RecurringExpense/activeOrInactiveRecurringExpense")(
//   app,
//   RecurringExpense
// );
//path crud SavingsGoal
// require("./src/routes/SavingsGoal/addSavingsGoal")(app, SavingsGoal);
// require("./src/routes/SavingsGoal/findAllSavingsGoal")(app, SavingsGoal);
// require("./src/routes/SavingsGoal/findByPkSavingsGoal")(app, SavingsGoal);
// require("./src/routes/SavingsGoal/destroySavingsGoal")(app, SavingsGoal);
// require("./src/routes/SavingsGoal/updateSavingsGoal")(app, SavingsGoal);
// require("./src/routes/SavingsGoal/activeOrInactiveSavingsGoal")(
//   app,
//   SavingsGoal
// );

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
