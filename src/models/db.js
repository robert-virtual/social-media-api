const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("krispdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  await sequelize.sync({ force: false }); //{ force: true }
})();

module.exports = sequelize;
