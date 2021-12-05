const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Post = sequelize.define(
  "Post",
  {
    // Model attributes are defined here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Posts",
    // Other model options go here
  }
);

module.exports = Post;
