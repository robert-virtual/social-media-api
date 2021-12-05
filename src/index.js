const express = require("express");
const users = require("./routes/users");
const posts = require("./routes/posts");
const friends = require("./routes/friends");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.json());

// routes
app.use("/users", users);
app.use("/posts", posts);
app.use("/friends", friends);
// app.use("/posts", posts);

app.listen(app.get("port"), () => {
  console.log("server running on port " + app.get("port"));
});
