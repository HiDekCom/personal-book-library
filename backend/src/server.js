require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

require("./models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log("Book library server is up and ready to roll");
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:");
    console.error(error.message);
  }
};

startServer();