const { Sequelize } = require("sequelize");
const { QueryTypes } = require("sequelize");
const fs = require("fs");

const logStream = fs.createWriteStream("./sql.log", { flags: "a" });

const express = require("express");
const app = express();
const port = 1337;
const sequelize = new Sequelize(
  "mysql://root:123456@localhost:3306/nestjs_examples",
  {
    pool: {
      max: 2,
      min: 1,
      acquire: 60000,
      idle: 10000,
    },
    logging: (msg) => logStream.write(msg),
  }
); // Example for postgres

app.get("/", async (req, res) => {
  try {
    console.log("Connection has been established successfully.");
    const numbers = [];
    for (let i = 0; i < 100; i++) {
      numbers.push(
        sequelize.query("SELECT COUNT(*) FROM `user`", {
          type: QueryTypes.SELECT,
        })
      );
    }
    numbers.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(10);
        }, 5000);
      })
    );
    const users = await Promise.all(numbers);
    res.send(users);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    logStream.write(error);
    res.send(error);
  }
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    logStream.write(error);
  }
  console.log(`Example app listening on port ${port}`);
});
