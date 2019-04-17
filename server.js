/***********************
  Load Components!
  ***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
  const dbConfig = {
   host: 'localhost',
   port: 5432,
   database: 'project',
   user: 'postgres',
   password: 'user'
 };

 var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// registration page 
app.get('/', function(req, res) {
  res.render('pages/home',{
    my_title:"LoChat login"
  });
});
app.get('/about',function(req,res){
  res.render('pages/about',{
    my_title:"about LoChat"
  })
});

app.post('/submit', function(req, res) {
  var username = req.body.uname;
  var password = req.body.psw;

  var insert_statement = "select password from acounts WHERE username = '"+username + "';";

  db.task('get-everything', task => {
    return task.batch([
      task.any(insert_statement),
      ]);
  })
  .then(info => {
    info = info.substring(0,length);
    console.log(info)
    if (info == password){
      console.log('nice job');
    }
    else{
      console.log('yousuck');
    }
    res.render('pages/login',{
      my_title: "Log in",
    })
  })
  .catch(error => {
        // display error message in case an error
        request.flash('error', err);
        response.render('pages/register', {
          title: 'Registration Failed',

        })
      }); 
});


app.post('/register/submit', function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.uname;
  var email = req.body.email;
  var password = req.body.psw;

  var insert_statement = "INSERT INTO acounts(firstname, lastname, username, email, password) VALUES('" + fname + "','" + 
  lname + "','" + username + "','" + email + "','" + password +"') ON CONFLICT DO NOTHING;";

  db.task('get-everything', task => {
    return task.batch([
      task.any(insert_statement),
      ]);
  })
  .then(info => {
    res.render('/',{
      my_title: "Log in",
    })
  })
  .catch(error => {
        // display error message in case an error
        request.flash('error', err);
        response.render('/', {
          title: 'Registration Failed',

        })
      }); 
});

app.listen(3003);
console.log('3000 is the magic port');
