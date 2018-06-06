const UserSchema = require('../models/User.js');
const mongoose = require('mongoose');

var User = null;
class UserSocket {

    constructor(con) {
        User = con.model('User', UserSchema);
    }

    storeUsers(data, res) {

        var newUser = new User({
            username: data.username,
            password: data.password,
            updateTime: data.updateTime
        });
        newUser.save(function(err, data){
            console.log(data);
            if(err){ 
                console.log(err); 
                res.send(err);
            }
            else{
                console.log(data);
                res.send(data);
            } 
        });
    };
    checkUsers(data, res) {
        var myUser = new User({
            username: data.username,
            password: data.password,
            updateTime: data.updateTime
        });
        User.find({ 
            'username': myUser.username,
            'password': myUser.password }, function(err, user) {
            
            if(err){ 
                console.log(err); 
                res.send(err);
            } else if (user.length == 1) {
                console.log(user);
                res.redirect('/blog/' + myUser.username); 
            } else {
                console.log('not found');
                res.send('not found');
            }
        });
    };

}

module.exports = UserSocket;
