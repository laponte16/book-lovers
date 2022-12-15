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

/*ENCRYPTION*/
const bcrypt = require('bcrypt');
const saltRounds = 10;


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

  res.render("./home", {result: obj});
  
});
/*home*/
app.get("/home", (req, res) => {

  var obj = {};
  obj.session = req.session;

  res.render("./home.ejs", {result: obj});
  
});
/*About*/
app.get("/about", (req, res) => {
  
  var obj = {};
  obj.session = req.session;

  res.render("./about.ejs", {result: obj});

});

/*Login Page*/
app.get("/login", (req, res) => {

  var obj = {};
  obj.session = req.session;

  res.render("./login.ejs", {result: obj});
});
/*PAGINA PARA PRUEBAS*/

/*QUERIES A LA DATABASE*/
/*GET*/
/*Pagina de Usuario - Usando valores de session*/
app.get("/user",(req, res) => {
  const client = new Client({
    connectionString,
  });
  //DEJE LA CONEXION AL CLIENTE POR SI A CASO ES NECESARIA LUEGO, si no, borrarla
  client.connect();

  var obj = {};
  obj.session = req.session;
   
  res.render("./user.ejs" , {result: obj} );

  client.end();

});
//La vista principal del foro
app.get("/genres",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT * FROM genres';

  client.query(text, (err, result) => {
    const genre = result.rows;

    const text1 = 'SELECT id_posts,title,id_user,creation_date,url_image FROM posts';

    client.query(text1, (err, result1) => {

      const post = result1.rows;
      for (var i = 0 ; i < post.length; i++) {
        post[i].creation_date = post[i].creation_date.toString();
        post[i].creation_date = post[i].creation_date.slice(0,24);
        }

      var obj = {};
      obj.genre = genre;
      obj.post = post;
      obj.session = req.session;
 
      res.render("./genres.ejs" , {result: obj} );
      
      client.end();
    });
  });
});
/*Logout*/
app.get("/signOut",(req, res) => {
  
  req.session.id_users = "";
  req.session.username = "";

  res.redirect('/home');

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
  
            res.render("./post.ejs" , {result: obj} );
      
            client.end();
  
        });

      });
    });
  });

});

/*Query para mostrar los generos segun el id nota no fiatra*/
app.get("/showGen/:id_genres",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT id_posts,title,id_user FROM posts WHERE id_genre = $1';
  const values = [req.params.id_genres];

  client.query(text, values, (err, result) => {

    posts = result.rows;

    const text1 = 'SELECT * FROM genres WHERE id_genres = $1';
    const values1 = [req.params.id_genres];

    client.query(text1, values1, (err, result1) => {

    genres = result1.rows;

    var obj = {};
    obj.posts = posts;
    obj.genres = genres;
    obj.session = req.session;
 
    res.render("./showgen.ejs" , {result: obj} );
      
    client.end();
    });
  });
});
/*Query para llevarte a la pagina de creacion de posts*/
app.get("/addPost",(req, res) => {
  const client = new Client({
    connectionString,
  });
  client.connect();

  const text = 'SELECT * FROM genres';

  client.query(text, (err, result) => {
    const genre = result.rows;

    var obj = {};
    obj.genre = genre;
    obj.session = req.session;
 
    res.render("./addPost.ejs" , {result: obj} );
      
    client.end();
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

  const text = 'SELECT * FROM users WHERE email =$1';
  const values = [email];
  
  client.query(text, values, (err, result1) => {

    bcrypt.compare(password, result1.rows[0].password, function(err, result) {
      if(result == true)
      {
        req.session.id_users = result1.rows[0].id_users;
        req.session.username = result1.rows[0].username;

        var obj = {};
        obj.session = req.session;

        res.render("./user.ejs", {result: obj});

        client.end()
      }
      else
      {
        var obj = {};
        obj.session = req.session;

        res.render("./login.ejs", {result: obj});
        client.end()
      }
    });
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

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    let password = hash;

    const text = 'INSERT INTO users(username,join_date, email, password) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [username, (year + "-" + month + "-" + date), email, password];

    client.query(text, values, (err, result) => {
      console.log(err, result.rows[0]);

      res.redirect('/login');

      client.end();
    });
  });
});

//Agregar un nuevo Genero 
app.post("/newGen",(req, res) => {
  const client = new Client({
    connectionString,
  })
      client.connect();
      let gen_name = req.body.gen_name;
      let img_gen = req.body.img_gen;
      const text = 'INSERT INTO genres(name,url_image) VALUES($1, $2) RETURNING *';
      const values = [gen_name,img_gen];
      client.query(text, values, (err, res) => {
      console.log(err, res.rows[0]);
      client.end();
  });
  
  res.render("./genres.ejs");

  });
//Crear un Post 
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
  let url_image = req.body.image;

  const text = 'INSERT INTO posts(title,id_user,id_genre,creation_date,content_post, url_image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [title,req.session.id_users,id_genres, (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds), content_post, url_image];

  client.query(text, values, (err, res) => {
    console.log(err, res.rows[0]);
    client.end();
  });
  
  res.redirect('/genres');
  
});

/*Crear una Answer en un post*/
app.post("/answer",(req, res) => {
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

  console.log(req.body.id_post, req.body.id_user);

  const text = 'INSERT INTO answers(id_post,id_user, creation_date,content_answer) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [id_posts, id_users, (year + "-" + month + "-" + date), respuesta];

  client.query(text, values, (err, result) => {
    console.log(err, result.rows);

    res.redirect('/post/'+id_posts);

    client.end();
  });
  
});

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

