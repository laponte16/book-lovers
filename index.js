const express = require("express");
const app = express();
var path = require('path');
var useragent = require('express-useragent');

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(useragent.express());

app.get("/", (req, res) => {
  res.send(req.useragent.isMobile);
  res.render("./index");
  
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