var https = require('https');
var fs = require('fs'); // new!
var express = require('express');
const app = express();

const options = {
    key: fs.readFileSync('/etc/nginx/ssl/cert.key'),
    cert: fs.readFileSync('/etc/nginx/ssl/cert.pem')
};
var httpsServer = https.createServer(options, app).listen(8080, '0.0.0.0');

// same below
// var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const con = mongoose.createConnection('mongodb://localhost/postdb');

const UserSocket = require('./src/socket/UserSocket.js');
const userSocket = new UserSocket(con);
const PostSocket = require('./src/socket/PostSocket.js');
const postSocket = new PostSocket(con);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'public')));


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

app.put('/blog/post', (req, res) => {

    var date = new Date();
    var localeSpecificTime = date.toLocaleTimeString();
    var localeSpecificDate = date.toLocaleDateString();
    date = localeSpecificTime + ", " + localeSpecificDate

    var newPost = {
        title: req.body.title,
        content: req.body.content,
        timestamp: new Date().getTime().toString(),
        time: date,
        hash: req.body.hash,
        author: req.body.author};
    
    postSocket.putPosts(newPost, res);
});
app.delete('/blog/post', (req, res) => {
    const hash = req.query.hash;
    postSocket.deleteArticle(hash, res);
});

app.get('/user/allusers', function(req, res){
    const me = req.query.username;
    
    userSocket.loadUserList(me, res);
});
app.get('/blog/list', function(req, res){
    const host = req.query.hostname;
    postSocket.loadPostList(host, res);
});

// https://stackoverflow.com/questions/43557390/react-router-and-express-get-conflict
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
});

//http.listen(port, function(err) {
//    if (err) {
//        console.log(err);
//    }
//    console.log('listen on port ' + port);
//});
