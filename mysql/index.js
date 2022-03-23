const express = require("express");
const app = express();
const port = 3000;
var db = require("./db");
app.get("/", async (req, res) => {
  const data = await new Promise((resolve) =>
    db.connection.query(
      "SELECT * FROM customers LIMIT 100 OFFSET 0",
      (err, result) => {
        if (err) {
          console.error(err);
          return resolve(err);
        }
        resolve(result);
      }
    )
  );
  res.send({ data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
