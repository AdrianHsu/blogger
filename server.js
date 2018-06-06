var express = require('express');
const app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const con = mongoose.createConnection('mongodb://localhost/postdb');

const UserSocket = require('./src/socket/UserSocket.js');
const userSocket = new UserSocket(con);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'public')));

app.get(['/', '/login'], function(req, res) {
    console.log('redirect to: login');
    res.sendFile(path.join(__dirname, './public/login.html'));
})

app.get('/signup', function(req, res) {
    console.log('redirect to: signup');
    res.sendFile(path.join(__dirname, './public/signup.html'));
})

app.get('/blog', function(req, res) {
    res.sendFile(path.join(__dirname, './public/blog.html'));
})

app.get('/redirect', function(req, res) {
    console.log(req.query.page);
    res.redirect(req.query.page); 
})
app.post('/user/signup', function (req, res) {
    
    var newUser = {username: req.body.username,
        password: req.body.password,
        updateTime: req.body.updateTime};
    
    userSocket.storeUsers(newUser, res);
});
app.post('/user/login', function (req, res) {
    var myUser = {
        username: req.body.username,
        password: req.body.password,
        updateTime: req.body.updateTime
    };

    userSocket.checkUsers(myUser, res);
});


http.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('listen on port ' + port);
});