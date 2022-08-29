const express = require("express");
const app = express();
var path = require('path');
var useragent = require('express-useragent');
const { Pool, Client } = require('pg')

const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
});

/*
Cuando se quiera hacer cualquier operacion, usar:
client.connect();

client.query('LA QUERY SQL AQUI', (err, res) => {
  console.log(err, res); esto es solo para mostrarla por consola
  client.end();
});

*/


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.use(useragent.express());

app.get("/", (req, res) => {
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/index");
  }
  else{
    res.render("./desktop/index");
    console.log(useragent.Agent.isMobile);
  }
});

app.get("/home", (req, res) => {
  res.render("./desktop/home/index.ejs");
});

app.get("/about", (req, res) => {
  if(useragent.Agent.isMobile == false){
     res.render("./mobile/about/index.ejs");
  }
  else{
    res.render("./desktop/about/index.ejs");
    console.log(useragent.Agent.isMobile);
  }
  
});

app.get("/gene", (req, res) => {
  res.render("./desktop/genres/generos.ejs");
});



app.get("/login", (req, res) => {
  res.render("./mobile/login/index.ejs");
});

app.get("/nav", (req, res) => {
  res.render("./mobile/nav/index.ejs");
});

app.get("/genres", (req, res) => {
  res.render("./mobile/genres/mobile_genres.ejs");
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});