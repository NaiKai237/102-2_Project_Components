const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

app.get('/', function(req, res) {
    res.render('pages/index.ejs');
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

app.post('/submit2', function(req, res) {
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
        response.render('pages/home', {
          title: 'Registration Failed',

        })
      }); 
});


app.post('/submit', function(req, res) {
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
    res.render('pages/index',{
      my_title: "title",
    })
  })
  .catch(error => {
        // display error message in case an error
        request.flash('error', err);
        response.render('/', {
          title: 'Error Message',

        })
      }); 
});


const server = http.listen(8080, function() {
    console.log('magic port is 8080');
})