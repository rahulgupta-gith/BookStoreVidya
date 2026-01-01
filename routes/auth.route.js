const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");

router.get("/login", (req, res) => res.render("auth/login"));
router.get("/register", (req, res) => res.render("auth/register"));
router.post("/register", register);
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});


module.exports = router;
