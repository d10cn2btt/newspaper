/**
 * Created by Truong on 24-Jul-16.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

var Post = require('../model/post');
var helper = require("../helper/helper");
var paramPath = "data/crawler_parameter.json";
var paramCrawler = fs.readFileSync(paramPath);
paramCrawler = JSON.parse(paramCrawler).vnexpress;

var SOURCE = paramCrawler.SOURCE;
var statusErr = 'error';
var statusSuccess = 'success';
var messErr = '';
var responseFormat = {
    "status": "",
    "messErr": "",
    "data": ""
};

router.get('/get-posts/:start?/:limit?', function (req, res, next) {
    var limit = 5;
    var start = 0;
    if (typeof req.params.start !== 'undefined' && !isNaN(req.params.start)) {
        start = parseInt(req.params.start);
    } else {
        messErr = 'First parameter must be number and required!';
        handleError(res, messErr, 400);
        return;
    }

    if (typeof req.params.limit !== 'undefined' && !isNaN(req.params.limit)) {
        limit = parseInt(req.params.limit);
    } else {
        messErr = 'Second parameter must be number and required!';
        handleError(res, messErr, 400);
        return;
    }

    Post.getPosts(start, limit, function (err, post) {
        if (err) {
            messErr = 'Error when get-posts ' + err;
            handleError(res, messErr, 500);
            return;
        }

        if (post == "") {
            messErr = 'No more post!';
            handleError(res, messErr, 500);
            return;
        }

        // set response
        responseFormat.status = statusSuccess;
        responseFormat.data = post;
        responseFormat.messErr = '';
        res.json(responseFormat);
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
                messErr = 'Error when get post detail ' + err;
                handleError(res, messErr, 500);
                return;
            }

            if (post == null) {
                messErr = 'No post has id ' + idPost;
                handleError(res, messErr, 404);
                return;
            }

            // inscrement post's read number
            post.number_read = post.number_read + 1;
            post.save();

            // set response
            responseFormat.status = statusSuccess;
            responseFormat.data = post;
            responseFormat.messErr = '';
            res.json(responseFormat);
        });
    } else {
        messErr = 'Parameter must be number!';
        handleError(res, messErr, 400);
    }
});

router.get('/get-rd-post/:limit?', function (req, res, next) {
    var limit = 5;

    if (typeof req.params.limit !== 'undefined' && !isNaN(req.params.limit)) {
        limit = parseInt(req.params.limit);
    } else {
        messErr = 'First parameter must be number and required!';
        handleError(res, messErr, 400);
        return;
    }

    Post.randomPost(limit, function (err, post) {
        if (err) {
            messErr = 'Error when get-rd-posts ' + err;
            handleError(res, messErr, 500);
            return;
        }

        if (post == "") {
            messErr = 'No more post!';
            handleError(res, messErr, 500);
            return;
        }

        // set response
        responseFormat.status = statusSuccess;
        responseFormat.data = post;
        responseFormat.messErr = '';
        res.json(responseFormat);
    });
});

function handleError(res, messErr, statusCode) {
    // write log
    helper.writeErrorLog('[API] ' + messErr);

    // set response
    responseFormat.status = statusErr;
    responseFormat.messErr = messErr;
    responseFormat.data = "";

    // send response
    res.statusCode = statusCode;
    res.json(responseFormat);
}

module.exports = router;