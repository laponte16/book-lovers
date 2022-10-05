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
  
  req.session.username = "";
  req.session.id_user = "";

  var obj = {};
  obj.session = req.session;

  if(useragent.Agent.isMobile == false){
    res.render("./mobile/home/home", {result: obj});
  }
  else{
    res.render("./desktop/index", {result: obj}); /*Recordar cambiar el path luego a home*/  
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

/*Login, Cambiar path luego*/
app.get("/login", (req, res) => {
  if(useragent.Agent.isMobile == false){
    res.render("./mobile/login/login.ejs", {session: req.session});
  }
  else{
    res.render("./desktop/login/index.ejs");
  }
});
/*PAGINA PARA PRUEBAS*/

/*QUERIES A LA DATABASE*/
/*GET*/
/*Pagina de Usuario - Usando valores de session*/
app.get("/user",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  var obj = {};
  obj.session = req.session;
 
    if(useragent.Agent.isMobile == false){
      res.render("./mobile/user/user.ejs" , {result: obj} );
    }
    else{
      res.render("./mobile/user/user.ejs" , {result: obj} );
    }

    client.end();


});
/*Query para mandar data de generos*/

//



/*Query para el futuro mandar la data de respuestas , falta llenarla y establecer que ruta usaremos */


/* posiblemente borremos todo este codigo que esta arriba */ 






app.get("/genres",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT * FROM genres';

  client.query(text, (err, result) => {
    const genre = result.rows;

    const text1 = 'SELECT id_posts,title,id_user FROM posts';

    client.query(text1, (err, result1) => {

      const post = result1.rows;

      var obj = {};
      obj.genre = genre;
      obj.post = post;
      obj.session = req.session;
 
      if(useragent.Agent.isMobile == false){
        res.render("./mobile/genres/genres.ejs" , {result: obj} );
      }
      else{
        res.render("./desktop/genres/genres.ejs" , {result: obj} );
      }
      client.end();
    });
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
/*Query para mostrar un post, mandando de parametro el id del mismo*/
app.get("/post/:post_id",(req, res) => {
  
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT * FROM posts WHERE id_posts = $1';
  const values = [req.params.post_id];

  client.query(text,values, (err, result) => {

    const post = result.rows[0];

    const text = 'SELECT * FROM users WHERE id_users = $1';
    const values = [post.id_user];
    client.query(text,values, (err, result1) => {

      var user = {};
      user.username = result1.rows[0].username;
      user.id_user = result1.rows[0].id_users;

      const text = 'SELECT * FROM genres WHERE id_genres = $1';
      const values = [post.id_genre];

      client.query(text,values, (err, result2) => {

        const genre = result2.rows.name;
        console.log(post.id_posts);
        const text = 'SELECT * FROM answers WHERE id_post = $1';
        const values = [post.id_posts];
      
        client.query(text,values, (err, result3) => {

          const answer = result3.rows;
        
            var obj = {};
            obj.genre = genre;
            obj.post = post;
            obj.user = user;
            obj.answer = answer;
            obj.session = req.session; 
  
            if(useragent.Agent.isMobile == false){
            res.render("./mobile/post/post.ejs" , {result: obj} );
            }
            else{
              res.render("./desktop/post/post.ejs" , {result: obj} );
            }
      
            client.end();
  
        });

      });
    });
  });

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

    var obj = {};
    obj.session = result.rows[0];

    if(useragent.Agent.isMobile == false){
      res.render("./mobile/user/user.ejs", {result: obj});
    }
    else{
      res.render("./desktop/user/user.ejs", {result: obj});
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
app.post("/create_post",(req, res) => {
  
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

  let title = req.body.title;
  let id_genres = req.body.id_genres;
  let content_post = req.body.content_post;

  const text = 'INSERT INTO posts(title,id_user,id_genre,creation_date,content_post) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [title,req.session.id_users,id_genres, (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds), content_post];

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

/* subir respuesta*/
app.post("/responder",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);


  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);


  let year = date_ob.getFullYear();

  let hours = date_ob.getHours();


  let minutes = date_ob.getMinutes();


  let seconds = date_ob.getSeconds();
  
  let respuesta = req.body.respuesta;
  let id_posts = req.body.id_post;
  let id_users = req.body.id_user;

  console.log(id_posts, id_users);

  const text = 'INSERT INTO answers(id_post,id_user, creation_date,content_answer) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [id_posts, id_users, (year + "-" + month + "-" + date), respuesta];

  client.query(text, values, (err, result) => {
    console.log(err, result.rows);

    var obj = {};
    obj.session = req.session;

    if(useragent.Agent.isMobile == false){
      res.render("./mobile/home/home.ejs", {result: obj});
    }
    else{
      res.render("./desktop/home/home.ejs", {result: obj});
    }

    client.end();
  });
  
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
  

});

