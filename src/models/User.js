const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Post = require("./Post");
const UserFriends = require("./UserFriends");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    freezeTableName: true,
    tableName: "Users",
    // Other model options go here
  }
);

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(User, {
  through: UserFriends,
  as: "friend",
  foreignKey: "friendId",
});

User.belongsToMany(User, {
  through: UserFriends,
  as: "user",
  foreignKey: "userId",
});

// UserFriends.belongsTo(User, { as: "friend" });
// UserFriends.belongsTo(User, { as: "user" });

module.exports = User;
