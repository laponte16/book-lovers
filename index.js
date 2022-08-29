const express = require("express");
const app = express();
var path = require('path');
var useragent = require('express-useragent');
const bodyParser = require('body-parser')
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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/login/index.ejs");
  }
  else{
    res.render("./desktop/login/index.ejs");
    console.log(useragent.Agent.isMobile);
  }
});

app.get("/nav", (req, res) => {
  res.render("./mobile/nav/index.ejs");
});


/*POST*/
app.post("/signUp",(req, res) => {
  client.connect();

  let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date in YYYY-MM-DD format
//(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
//(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  const text = 'INSERT INTO users(username,join_date, email, password) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [username, (year + "-" + month + "-" + date), email, password];

  client.query(text, values, (err, res) => {
    console.log(err, res.rows[0]);
    client.end();
  });
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/login");
  }
  else{
    res.render("./desktop/login");
    console.log(useragent.Agent.isMobile);
  }
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});