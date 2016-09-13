/**
 * Created by Truong on 24-Jul-16.
 */
var express = require('express');
var router = express.Router();

var Post = require('../model/post');
var helper = require("../helper/helper");
var SOURCE = 'thethao.vnexpress.net';

router.get('/get-posts/:start?/:limit?', function (req, res, next) {
    var limit = 5;
    var start = 0;
    if (typeof req.params.limit !== 'undefined' && !isNaN(req.params.limit)) {
        limit = req.params.limit;
    }

    if (typeof req.params.start !== 'undefined' && !isNaN(req.params.start)) {
        start = req.params.start;
    }

    Post.getPosts(start, limit, function (err, post) {
        if (err) {
            helper.writeErrorLog('Error when getPost for API ');
        }

        res.json(post);
    });
});

router.get('/get-post-detail/:id', function (req, res, next) {
    var idPost = req.params.id;
    if (!isNaN(idPost)) {
        var query = {
            id_post: idPost,
            source: SOURCE
        };
        Post.checkExists(query, function (error, post) {
            if (error) {
                helper.writeErrorLog("[API] Error when get detail" + error);
            }
            res.json(post);
        });
    } else {
        var error = "Param was not correct";
        helper.writeErrorLog(error);
        res.json(error);
    }
});

module.exports = router;