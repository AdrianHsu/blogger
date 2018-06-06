var express = require('express');
const app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'public')));

app.get(['/', '/blog'], function(req, res) {
    res.sendFile(path.join(__dirname, './public/blog.html'));
})

// app.get('/redirect', function(req, res) {
//     console.log(req.query.page);
//     res.redirect(req.query.page); 
// })

http.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('listen on port ' + port);
});