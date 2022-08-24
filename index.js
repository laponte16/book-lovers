const express = require("express");
const app = express();
var path = require('path');

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("/home/index");
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});