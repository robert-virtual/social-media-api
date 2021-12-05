const UserFriends = require("../models/UserFriends");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { userId, friendId } = req.body;

  await UserFriends.create({ userId, friendId });
  return res.json({
    msg: "friendship created",
  });
});

router.get("/", async (req, res) => {
  const relationships = await UserFriends.findAll();
  return res.json({
    relationships,
  });
});

module.exports = router;
