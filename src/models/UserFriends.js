const sequelize = require("./db");

const UserFriends = sequelize.define(
  "UserFriends",
  {},
  {
    freezeTableName: true,
  }
);

module.exports = UserFriends;
