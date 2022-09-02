const express = require("express");
const app = express();
var path = require('path');
var useragent = require('express-useragent');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

/*CONEXIONES*/
const connectionString = 'postgres://wfturvva:5-z7JVrBwrWM1kpo5MXpzr2Lekh3uCjB@otto.db.elephantsql.com/wfturvva'
const pool = new Pool({
  connectionString,
});


/*MODULOS DEL SERVER*/
/*La Engine de visualizacion: EJS */
app.set("view engine", "ejs");
/*Referencias estaticas a los recursos: public*/
app.use(express.static(path.join(__dirname, "public")));
/*path para las vistas, lo que renderiza el motor*/
app.set('views', path.join(__dirname, 'views'));
/*modulo para identificar dispositivo del user y sus datos*/
app.use(useragent.express());
/*Modulo para usar JSON*/
app.use(express.json());
/*Modulo del body-parser, para interpretar forms desde el cliente*/
app.use(bodyParser.urlencoded({ extended: false }));
/*Para que la app entienda los parametros que le llegan desde el cliente*/
app.use(express.urlencoded({ extended: false }));
/*Modulo de session de express-session + pg-connect-simple*/
app.use(session({
  store: new pgSession({
    pool : pool,                // Connection pool
    tableName : 'session'   // Use another table-name than the default "session" one
    // Insert connect-pg-simple options here
  }),
  secret: 'book-lovers',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  // Insert express-session options here
}));

/*PATHS GENERALES DEL CLIENTE*/
/*Inicial*/
app.get("/", (req, res) => {
  
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/home/home");
  }
  else{
    res.render("./desktop/index"); /*Recordar cambiar el path luego a home*/
    console.log(useragent.Agent.isMobile);   
  }
});
/*home? Lo usaremos? Se puede usar el general*/
app.get("/home", (req, res) => {
  if(useragent.Agent.isMobile == false){
     res.render("./mobile/home/home.ejs");
  }
  else{
    res.render("./desktop/home/index.ejs");/*Cambiar path luego*/
    console.log(useragent.Agent.isMobile);
  }
});
/*About*/
app.get("/about", (req, res) => {
  if(useragent.Agent.isMobile == false){
     res.render("./mobile/about/about.ejs");
  }
  else{
    res.render("./desktop/about/index.ejs");/*Cambiar path luego*/
    console.log(useragent.Agent.isMobile);
  }
});
/*Generos*/
app.get("/genres", (req, res) => {
  if(useragent.Agent.isMobile == false){
      res.render("./mobile/genres/genres.ejs");
  }
  else{
    res.render("./desktop/genres/genres.ejs");
    console.log(useragent.Agent.isMobile);
  }
});
/*Login, Cambiar path luego*/
app.get("/login", (req, res) => {
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/login/index.ejs", {session: req.session});
  }
  else{
    res.render("./desktop/login/index.ejs");
  }
});
/*PAGINA PARA PRUEBAS*/
app.get("/pruebas", (req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();


  if(useragent.Agent.isMobile == false){
    res.render("./mobile/genres/formularios.ejs", {session: req.session});
  }
  else{
    res.render("./desktop/genres/formularios.ejs");
  }
});

/*QUERIES A LA DATABASE*/
/*GET*/
/*Pagina de Usuario - Usando valores de session*/
app.get("/user",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  
 
    if(useragent.Agent.isMobile == false){
      res.render("./mobile/user/user.ejs" , {session: req.session} );
    }
    else{
      res.render("./mobile/user/user.ejs" , {session: req.session} );
    }

    client.end();


});
/*Query para mandar data de generos*/
app.get("/getGenres",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT * FROM genres';

  client.query(text, (err, result) => {
 
    const genre = result.rows;

    const text1 = 'SELECT * FROM posts';

    client.query(text1, (err, result1) => {

      const post = result1.rows;

      var obj = {};
      obj.genre = genre;
      obj.post = post;
      obj.session = req.session;

      if(useragent.Agent.isMobile == false){
        res.render("./mobile/genres/formularios.ejs" , {result: obj} );
      }
      else{
        res.render("./desktop/genres/formularios.ejs" , {result: obj} );
      }
      client.end();
    });
  });
});
//
/*Query para mandar data de generos y inicializar cantidad de generos */
app.get("/getGeneros",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT * FROM genres';

  client.query(text, (err, result) => {
 
    if(useragent.Agent.isMobile == false){
      res.render("./mobile/genres/genres.ejs" , {result: result.rows} );
    }
    else{
      res.render("./mobile/genres/genres.ejs" , {result: result.rows} );
    }

    client.end();
  });

});

app.get("/getGen",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT * FROM genres';

  client.query(text, (err, result) => {
 
    if(useragent.Agent.isMobile == false){
      res.render("./mobile/genres/genres.ejs" , {result: result.rows} );
    }
    else{
      res.render("./mobile/genres/genres.ejs" , {result: result.rows} );
    }

    client.end();
  });

});
/*Logout*/
app.get("/signOut",(req, res) => {
  
  req.session.id_users = "";
  req.session.username = "";

  if(useragent.Agent.isMobile == false){
    res.render("./mobile/login/login.ejs", {session: req.session});
  }
  else{
    res.render("./desktop/login/login.ejs");
  }

});
/*POST*/
/*Loggearse*/
app.post("/signIn",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  let email = req.body.email;
  let password = req.body.password;

  const text = 'SELECT * FROM users WHERE email =$1 AND password = $2';
  const values = [email,password];
  
  client.query(text, values, (err, result) => {
    req.session.id_users = result.rows[0].id_users;
    req.session.username = result.rows[0].username;
    console.log(result.rows);
    if(useragent.Agent.isMobile == false){
      res.render("./mobile/user/user.ejs", {session: req.session});
    }
    else{
      res.render("./desktop/user/user.ejs");
    }

    client.end()
  });
  
});
/*Registrarse*/
app.post("/signUp",(req, res) => {
  const client = new Client({
    connectionString,
  });
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
    res.render("./mobile/login/login.ejs");
  }
  else{
    res.render("./desktop/login/login.ejs");
    console.log(useragent.Agent.isMobile);
  }
});
// subir genero 

app.post("/subir",(req, res) => {
      client.connect();
      let gen_name = req.body.gen_name;
      let img_gen = req.body.img_gen;
      const text = 'INSERT INTO genres(name,url_image) VALUES($1, $2) RETURNING *';
      const values = [gen_name,img_gen];
      client.query(text, values, (err, res) => {
      console.log(err, res.rows[0]);
      client.end();
  });
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/genres/genres.ejs");
  }
  else{
    res.render("./desktop/genres/genres.ejs");
    console.log(useragent.Agent.isMobile);
  }

  });
// subir libro 
app.post("/publicar",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date1 = ("0" + date_ob.getDate()).slice(-2);

// current month
let month1 = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year1 = date_ob.getFullYear();

// current hours
let hours1 = date_ob.getHours();

// current minutes
let minutes1 = date_ob.getMinutes();

// current seconds
let seconds1 = date_ob.getSeconds();



  let title = req.body.title;
  let id_genres = req.body.id_genres;
  let content_post = req.body.content_post;

  const text = 'INSERT INTO posts(title,creation_date,content_post VALUES($1, $2, $3) RETURNING *';
  const values = [title, (year1 + "-" + month1 + "-" + date1), content_post];

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