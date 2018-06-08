const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    time: String,
    content: String,
    timestamp: String,
    author: String
});

module.exports = postSchema;