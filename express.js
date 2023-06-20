const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const path = require("path");

// static assets
const publicAssetsPath = path.resolve(process.cwd(), "public");
app.use("/public", express.static(publicAssetsPath));
// Your asset will be placed at : http://localhost:1337/public/assets/main.css

// select view engine is ejs
app.set("view engine", "ejs");

// set view folder
const viewsPath = process.cwd() + "/views";
app.set("views", [viewsPath]);

// global title
app.locals = {
  title: "MVC Tutorial",
};

// home page
app.get("/", (req, res) => {
  res.render("index", { heading: "Home page" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
