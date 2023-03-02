const auth = require("../../authentification/auth");

module.exports = (app, User) => {
  // Supprimer un utilisateur par ID
  app.delete("/users/:id", auth, async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.destroy();
        res.json({
          message: `Utilisateur ${user.pseudo} supprimé avec succès`,
          data: user,
        });
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
  });
};
