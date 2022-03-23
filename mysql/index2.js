const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const poolLimit = 10;
var db = mysql.createConnection(
  `mysql://root:123456@localhost/jsguru-typeorm?debug=false&charset=utf8mb4&timezone=+0700`
);
app.get("/", async (req, res) => {
  const data = await new Promise((resolve) =>
    db.query("SELECT * FROM customers LIMIT 100 OFFSET 0", (err, result) => {
      if (err) {
        console.error(err);
        return resolve(err);
      }
      resolve(result);
    })
  );
  res.send({ data });
});

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});
