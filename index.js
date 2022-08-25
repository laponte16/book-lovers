const express = require("express");
const app = express();
var path = require('path');
var useragent = require('express-useragent');

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("./index");
  res.send(req.useragent.isMobile);
});

app.get("/home", (req, res) => {
  res.render("./home/index.ejs");
});

app.get("/about", (req, res) => {
  res.render("./about/index.ejs");
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});