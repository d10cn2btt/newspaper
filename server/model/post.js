/**
 * Created by Truong on 19-Jul-16.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    short_des: {
        type: String,
        required: true,
    },
    thumb: {
        type: String
    },
    content: {
        type: String
    },
    id_post: {
        type: Number,
        required: true,
    },
    source: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var postObject = module.exports = mongoose.model('post', postSchema);

//get post for api
module.exports.getPosts = function (limit, callback) {
    postObject.find(callback).limit(limit);
};

//add many article
module.exports.createManyPost = function (posts, callback) {
    postObject.insertMany(posts, callback);
};

//check source is exists
module.exports.checkExists = function (query, callback) {
    postObject.findOne(query, callback);
};

//add an article
module.exports.createPost = function (newPost, callback) {
    newPost.save(callback);
};