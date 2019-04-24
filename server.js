const express = require('express');
const app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

//Create Database Connection
var pgp = require('pg-promise')();
/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
  **********************/
 const dbConfig = process.env.DATABASE_URL;

 var db = pgp(dbConfig);


app.get('/', function(req, res) {
  res.render('pages/home',{
    my_title: "home",
  })
});


app.get('/home', function(req, res) {
  res.render('pages/home',{
    my_title:"LoChat login"
  });
});

app.get('/about',function(req,res){
  res.render('pages/about',{
    my_title:"about LoChat"
  })
});

app.post('/login', function(req, res) {
  var username = req.body.loginuname;
  var password = req.body.loginpsw;

  // ADDED CRYPTO SECTION
  const crypto = require('crypto');
  const hash = crypto.createHmac('sha256', password)
                     .update('I love cupcakes')
                     .digest('hex');
// END CRYPTO SECTION

  var insert_statement = "select password from acounts WHERE username = '"+username + "';";
  console.log(insert_statement);

  db.task('get-everything', task => {
    return task.batch([
      task.any(insert_statement),
      ]);
  })
  .then(info => {
    if (info[0][0] && info[0][0].password == hash){ // CHANGED LINE
      console.log('Successful Login'); // CHANGED LINE
      res.render('pages/index',{
        user: username,
      })
    }
  else{
      console.log('Failed Login'); //CHANGED LINE
      res.render('pages/home',{ // CHANGED LINE
        my_title: "Login Failed", // CHANGED LINE
      })
    }
  })
  .catch(error => {
        // display error message in case an error
        request.flash('error', err);
        response.render('pages/home', { // CHANGED LINE
          title: 'Login Failed',
        })
      }); 
});


app.post('/submit', function(req, res) {
  console.log(req.body.fname);
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.uname;
  var email = req.body.email;
  var password = req.body.psw;


// ADDED CRYPTO SECTION
  const crypto = require('crypto');
  const hash = crypto.createHmac('sha256', password)
                     .update('I love cupcakes')
                     .digest('hex');
// END CRYPTO SECTION

  var insert_statement = "INSERT INTO acounts(firstname, lastname, username, email, password) VALUES('" + fname + "','" + 
  lname + "','" + username + "','" + email + "','" + hash +"') ON CONFLICT DO NOTHING;"; //changed password to hash

  db.task('get-everything', task => {
    return task.batch([
      task.any(insert_statement),
      ]);
  })
  .then(info => {
    res.render('pages/index',{
      user: username,
    })
  })
  .catch(error => {
        // display error message in case an error
        request.flash('error', err);
                response.render('pages/home', { // CHANGED LINE
          title: 'Error Message',
        })
      }); 
});

var port = process.env.PORT || 3000;

const server = app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

