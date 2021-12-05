const router = require("express").Router();
const { hash, verify } = require("../helpers/hash");
const Post = require("../models/Post");
const User = require("../models/User");

//users/register
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ where: { email } });
  if (exist) {
    return res
      .status(409)
      .json({ error: "already exist an account with the given email" });
  }

  const user = await User.create({ email, password: hash(password) });
  res.json({
    user,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({
      error: "Bad credentilas",
    });
  }
  let valid = verify(password, user.password);

  if (valid) {
    return res.json({
      msg: "Welcome " + user.email,
      user,
    });
  }

  res.status(401).json({
    error: "Bad credentilas",
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { include: [Post] });

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  res.json({
    user,
  });
});

module.exports = router;
