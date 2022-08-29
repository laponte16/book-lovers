const express = require("express");
const app = express();
var path = require('path');
var useragent = require('express-useragent');
const { Pool, Client } = require('pg')
const connectionString = 'postgres://wfturvva:5-z7JVrBwrWM1kpo5MXpzr2Lekh3uCjB@otto.db.elephantsql.com/wfturvva'

const client = new Client({
  connectionString,
});

/*
  Esto es el template de query:
  La conexion
  La query
  la funcion prometida que resulta
  Mostrar por consola en este caso
  Cerrar la conexion
  Y terminar la response

  client.connect();

  client.query('LA QUERY SQL AQUI', (err, res) => {
    console.log(err, res); 
    client.end();
  });
  res.end("Que loco");

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
  if(useragent.Agent.isMobile == false){
     res.render("./mobile/home/index.ejs");
  }
  else{
    res.render("./desktop/home/index.ejs");
    console.log(useragent.Agent.isMobile);
  }
});

app.get("/about", (req, res) => {
  if(useragent.Agent.isMobile == false){
     res.render("./mobile/about/about.ejs");
  }
  else{
    res.render("./desktop/about/index.ejs");
    console.log(useragent.Agent.isMobile);
  }
  
});

app.get("/genres", (req, res) => {
  if(useragent.Agent.isMobile == false){
      res.render("./mobile/genres/genres.ejs");
  }
  else{
    res.render("./desktop/genres/genres.ejs");
    console.log(useragent.Agent.isMobile);
  }

});



app.get("/login", (req, res) => {
  res.render("./mobile/login/index.ejs");
});

app.get("/nav", (req, res) => {
  res.render("./mobile/nav/index.ejs");
});


/*POST*/
app.post("/prueba",(req, res) => {
  client.connect();

  client.query("INSERT INTO users(username,join_date,email,password)VALUES('Testo','2022-08-28','test@test.com','123')", (err, res) => {
    console.log(err, res);
    client.end();
  });
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/index");
  }
  else{
    res.render("./desktop/index");
    console.log(useragent.Agent.isMobile);
  }
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});