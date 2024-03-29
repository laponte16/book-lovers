const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

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
  idleTimeoutMillis: 10,
  max: 5
});

/*ENCRYPTION*/
const bcrypt = require('bcrypt');
const { promiseImpl } = require("ejs");
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
  
  if(req.session.username == null){
    req.session.username = "";
    req.session.id_user = "";
  }
  

  var obj = {};
  obj.session = req.session;

  res.redirect("/home");
  
});
/*home*/
app.get("/home", (req, res) => {

  const text0 = 'SELECT id_posts,title,url_image FROM posts ORDER BY creation_date DESC LIMIT 10';

  const text1 = 'SELECT a.id_posts,a.title,a.url_image,COUNT(b.id_post) as count'+
  ' FROM posts a' +
  ' LEFT OUTER JOIN answers b' +
  ' ON a.id_posts = b.id_post'+
  ' GROUP BY a.id_posts'+
  ' ORDER BY count DESC LIMIT 10';

  Promise.all([
    pool.query(text0),
    pool.query(text1)
  ]).then(function([result,result1]) {

    const postNew = result.rows;
    const postHot = result1.rows;

    var obj = {};
    obj.session = req.session;
    obj.postNew = postNew;
    obj.postHot = postHot;

    res.render("./home.ejs", {result: obj});
  });
  
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
app.get("/user/:user_id",(req, res) => {

  let user_id = req.params.user_id;

  text1 = 'SELECT username,join_date FROM users WHERE id_users = $1';
  value1 = [user_id];

  text2 = 'SELECT id_posts,title FROM posts WHERE id_user = $1';
  value2 = [user_id];

  Promise.all([
    pool.query(text1,value1),
    pool.query(text2,value2)
  ]).then(function([result1,result2]){

    var user = result1.rows[0];
    var posts = result2.rows;

    user.join_date = user.join_date.toString();
    user.join_date = user.join_date.slice(0,15);

    var obj = {};
    obj.session = req.session;
    obj.user = user;
    obj.posts = posts;
   
  res.render("./user.ejs" , {result: obj} );

  });
});
//La vista principal del foro
app.get("/forum/:filter/:view",(req, res) => {

  let filter = req.params.filter;
  let view = (parseInt(req.params.view)-1) *10;
  //Queries y Valores
  const text0 = 'SELECT * FROM genres';
  //CONDICIONES DE FILTRADO
  var text1 = '';
  var values1 = [];
  var text4 = '';
  var values4 = [];
  //SIN FILTRO
  if(filter == 'noFilter'){
    text1 = 'SELECT id_posts,id_genre,title,id_user,creation_date,content_post,url_image FROM posts LIMIT 10 OFFSET $1';
    values1 = [view];

    text4 = 'SELECT COUNT(*) FROM posts';
  }
  //BUSQUEDA POR GENERO
  if(filter.slice(0,5) == 'genre'){
    text1 = 'SELECT id_posts,id_genre,title,id_user,creation_date,content_post,url_image FROM posts WHERE id_genre = $2 LIMIT 10 OFFSET $1';
    values1 = [view,filter.slice(6,filter.length)];

    text4 = 'SELECT COUNT(*) FROM posts WHERE id_genre = $1';
    values4 = [filter.slice(6,filter.length)];
  }
  //CON BUSQUEDA POR TITULO O CONTENIDO
  if(filter.slice(0,6) == 'search'){
    text1 = 'SELECT id_posts,id_genre,title,id_user,creation_date,content_post,url_image FROM posts WHERE (LOWER(title)) LIKE LOWER($2) OR LOWER(content_post) LIKE LOWER($2) LIMIT 10 OFFSET $1';
    values1 = [view,'%'+filter.slice(7,filter.length)+'%'];

    text4 = 'SELECT COUNT(*) FROM posts WHERE (LOWER(title)) LIKE LOWER($1) OR LOWER(content_post) LIKE LOWER($1)';
    values4 = ['%'+filter.slice(7,filter.length)+'%'];
  }
  
  const text2 = 'SELECT id_users,username FROM users';

  const text3 = 'SELECT id_post,creation_date FROM answers WHERE id_post IN (SELECT id_posts FROM posts)';

  //Ejecucion de Queries en simultaneo
  Promise.all([
    pool.query(text0),
    pool.query(text1,values1),
    pool.query(text2),
    pool.query(text3),
    pool.query(text4,values4)
  ]).then(function([result, result1, result2, result3, result4]) {

    const genre = result.rows;

    post = result1.rows;
    //Preview del post
    for(var i = 0; i<post.length; i++){
      post[i].number_words = post[i].content_post.length;
      if(post[i].content_post.length >= 75){post[i].content_post = post[i].content_post.slice(0,75);}
      else {post[i].content_post = post[i].content_post.slice(0,post[i].content_post.length);}
    }

    const users = result2.rows;
    //Fecha de creacion del post y buscar el username del creador
    for (var i = 0 ; i < post.length; i++) {
      post[i].creation_date = post[i].creation_date.toString();
      post[i].creation_date = post[i].creation_date.slice(0,24);

      for (var j = 0 ; j < users.length; j++) {
        if(post[i].id_user == users[j].id_users)
          {
            post[i].username = users[j].username;
          }
      }

      for (var j = 0 ; j < genre.length; j++) {
        if(post[i].id_genre == genre[j].id_genres)
          {
            post[i].genre = genre[j].name;
          }
      }
    }

    const answers = result3.rows;

    const numberOfPosts = result4.rows[0].count;
    //Objeto de resultados
    var obj = {};
    obj.genre = genre;
    obj.post = post;
    obj.session = req.session;
    //Filtro
    obj.filter = filter;
    //Numero de paginas a visualizar
    var current = req.params.view;
    var max = 999;
    if(numberOfPosts < 10){max = 1;}
    else if(numberOfPosts%10 != 0){max = Math.floor((numberOfPosts/10)+1);}
    else{max = Math.floor(numberOfPosts/10);}
    obj.view = {current,max};

    //Buscando la fecha de la ultima actividad, respuesta si hay o el post si no hay
    for(i = 0; i < obj.post.length; i++){

      answerProvisional = [];

      for(j = 0; j< answers.length; j++){

        if(answers[j].id_post == obj.post[i].id_posts){

          answerProvisional.push(answers[j].creation_date);

        }

      }
      if(answerProvisional.length > 0){

        obj.post[i].activity = answerProvisional[answerProvisional.length - 1].toString();
        obj.post[i].activity = obj.post[i].activity.slice(0,24);
        obj.post[i].replies = answerProvisional.length;

      }

      else{

        obj.post[i].activity = obj.post[i].creation_date;
        obj.post[i].replies = 0;

      }
                  
    }
    //Renderizado
    res.render("./forum.ejs" , {result: obj});
  }, function(error) {
    throw error;
  });

});

//Funcion para buscar posts que contengan el parametro de busqueda
app.post("/search/",(req, res) => {

  //Contenido de la busqueda
  let search = req.body.search;
  
  res.redirect("/forum/search="+search+"/1")

}); 

/*Logout*/
app.get("/signOut",(req, res) => {
  
  req.session.id_users = "";
  req.session.username = "";

  res.redirect('/home');

});

/*Query para mostrar un post, mandando de parametro el id del mismo*/
app.get("/post/:post_id",(req, res) => {

  /* Queries y Valores */
  const text = 'SELECT * FROM posts WHERE id_posts = $1';
  const values = [req.params.post_id];
  
  pool.query(text,values,(err, result) =>{
    const post = result.rows[0];

    post.creation_date = post.creation_date.toString();
    post.creation_date = post.creation_date.slice(0,24);

    const text1 = 'SELECT * FROM users WHERE id_users = $1';
    const values1 = [post.id_user];

    const text2 = 'SELECT * FROM genres WHERE id_genres = $1';
    const values2 = [post.id_genre];

    const text3 = 'SELECT * FROM answers WHERE id_post = $1';
    const values3 = [post.id_posts];

    const text4 = 'SELECT id_users,username FROM users WHERE id_users IN (SELECT id_user FROM answers WHERE id_post = $1)';
    const values4 = [post.id_posts];

    Promise.all([
      pool.query(text1,values1),
      pool.query(text2,values2),
      pool.query(text3,values3),
      pool.query(text4,values4)
    ]).then(function([result1, result2, result3, result4]) {
  
      var user = {};
      user.username = result1.rows[0].username;
      user.id_user = result1.rows[0].id_users;
  
      const genre = result2.rows.name;
  
      answer = result3.rows;

      const userAnswers = result4.rows;

      for(var i = 0; i < answer.length; i++){
        for(var j = 0; j<userAnswers.length; j++){
          if(answer[i].id_user == userAnswers[j].id_users){
            answer[i].username = userAnswers[j].username;
          }
        }

        answer[i].creation_date = answer[i].creation_date.toString();
        answer[i].creation_date = answer[i].creation_date.slice(0,24);
      }
      var obj = {};
  
      obj.post = post;
      obj.user = user;
      obj.genre = genre;
      obj.answer = answer;
      obj.session = req.session; 
    
      res.render("./post.ejs" , {result: obj} );
  
    }, function(error) {
      throw error;
    });
  });

});

/*Query para mostrar los generos segun el id nota no fiatra*/

/*Query para llevarte a la pagina de creacion de posts*/
app.get("/addPost",(req, res) => {
  pool.connect();

  const text = 'SELECT * FROM genres';

  pool.query(text, (err, result) => {
    const genre = result.rows;

    var obj = {};
    obj.genre = genre;
    obj.session = req.session;
 
    res.render("./addPost.ejs" , {result: obj} );
      
  });
});
/*POST*/
/*Loggearse*/
app.post("/signIn",(req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  const text = 'SELECT * FROM users WHERE email =$1';
  const values = [email];
  
  pool.query(text, values, (err, result1) => {

    bcrypt.compare(password, result1.rows[0].password, function(err, result) {
      if(result == true)
      {
        req.session.id_users = result1.rows[0].id_users;
        req.session.username = result1.rows[0].username;

        var obj = {};
        obj.session = req.session;

        res.redirect("/home");

      }
      else
      {
        var obj = {};
        obj.session = req.session;

        res.render("./login.ejs", {result: obj});
      }
    });
  });
  
});
/*Registrarse*/
app.post("/signUp",(req, res) => {

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

    pool.query(text, values, (err, result) => {

      res.redirect('/login');

    });
  });
});

//agregar nuevo genero a los ya existentes 
app.post("/newGen",(req, res) => {

  let gen_name = req.body.gen_name;
  let img_gen = req.body.img_gen;

  const text = 'INSERT INTO genres(name,url_image) VALUES($1, $2) RETURNING *';
  const values = [gen_name,img_gen];

  pool.query(text, values, (err, result) => {

    res.redirect('/forum');

  });
 
  
 });


//Crear un Post  res.render
app.post("/create_post",(req, res) => {
  
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

  pool.query(text, values, (err, result) => {

    res.redirect('/forum');

  });
  
});
//FUNCIONES DEL LOGIN
//FUNCIONES DEL USER
//FUNCIONES DEL FORUM
//FUNCIONES DEL POST
//Crear una Answer en un post
app.post("/answer",(req, res) => {

  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);


  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);


  let year = date_ob.getFullYear();

  let hours = date_ob.getHours();


  let minutes = date_ob.getMinutes();


  let seconds = date_ob.getSeconds();
  
  let answer = req.body.answer;
  let id_posts = req.body.id_post;
  let id_users = req.body.id_user;

  const text = 'INSERT INTO answers(id_post,id_user, creation_date,content_answer) VALUES($1, $2, $3, $4)';
  const values = [id_posts, id_users, (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds), answer];

  pool.query(text, values, (err, result) => {
  
    res.redirect('/post/'+id_posts);
    console.log(err);
  });
  
}); 

//LISTENER CENTRAL DEL NODE
app.listen(PORT, () => {
  console.log("Application started and Listening on port " + PORT);
});

