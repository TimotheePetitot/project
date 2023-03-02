const bcrypt = require("bcrypt");
const auth = require("../../authentification/auth");

module.exports = (app, User) => {
  app.put("/users/:id", auth, async (req, res) => {
    const id = req.params.id;
    const {
      lastname,
      firstname,
      pseudo,
      user_img,
      salary,
      user_saving,
      password,
      email,
    } = req.body;

    try {
      User.findByPk(id).then((user) => {
        if (user === null) {
          return res
            .status(404)
            .json({ message: `User ${pseudo} introuvable` });
        }
        bcrypt.hash(password, 10).then((hash) => {
          user
            .update({
              lastname,
              firstname,
              pseudo,
              user_img,
              salary,
              user_saving,
              password: hash,
              email,
            })
            .then(() => {
              res.json({ message: `User ${pseudo} modifier`, data: user });
            });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la modification de l'utilisateur",
        data: error,
      });
    }
  });
};
