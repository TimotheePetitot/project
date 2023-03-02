const bcrypt = require("bcrypt");

module.exports = (app, User) => {
  app.post("/users", (req, res) => {
    try {
      const lastname = req.body.lastname;
      const firstname = req.body.firstname;
      const pseudo = req.body.pseudo;
      const user_img = req.body.user_img;
      const salary = req.body.salary;
      const user_saving = req.body.user_saving;
      const password = req.body.password;
      const email = req.body.email;
      User.findOne({ where: { email } }).then((element) => {
        if (element) {
          return res
            .status(409)
            .json({ message: "un compte existe déjà avec cet email" });
        }
        bcrypt.hash(password, 10).then((hash) => {
          User.create({
            lastname: lastname,
            firstname: firstname,
            pseudo: pseudo,
            email: email,
            user_img,
            password: hash,
            salary: salary,
            user_saving: user_saving,
          }).then((element) => {
            res.json({
              message: `User ${pseudo} ajouté avec succes`,
              data: element,
            });
          });
        });
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la création de l'utilisateur",
      });
    }
  });
};
