// lib
var express = require('express');
var router = express.Router();
var app = express();

// module
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');// Basically jQuery for node.js
var _ = require("underscore");
var entities = require("entities");
var helper = require("../helper/helper");
var Post = require('../model/post');
var moment = require('moment');

// param crawler
var paramPath = "data/crawler_parameter.json";
var paramCrawler = fs.readFileSync(paramPath);
paramCrawler = JSON.parse(paramCrawler).vnexpress;

var SOURCE = paramCrawler.SOURCE;
var paramUrl = paramCrawler.url;
var paramPosts = paramCrawler.listPost.post;
var paramUrlPostDetail = paramCrawler.listPost.urlPostDetail;
var paramPostTitle = paramCrawler.post.title;
var paramPostShortdes = paramCrawler.post.shortDes;
var paramPostThumb = paramCrawler.post.thumb;
var paramPostPhoto = paramCrawler.post.postPhoto;
var paramPostContent = paramCrawler.post.postContent;

router.get('/getData', function (req, res, next) {
    request(paramUrl, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var data = new Array();
            var total = 0;
            var count = 0;
            $(paramPosts).each(function (index) {
                var json = {id_post: "", title: "", url: "", short_des: "", thumb: "", content: "", source: SOURCE};
                var urlItem = $(this).find(paramUrlPostDetail).attr("href");
                var checkExist = false;
                // remove div has no content
                if (!(typeof urlItem === "undefined")) {
                    total++;
                    console.log("total" + total);
                    json.id_post = helper.getIdFormUrl(urlItem);
                    //trim() - remove \r\n and space
                    json.title = $(this).find(paramPostTitle).text().trim();
                    json.url = encodeURI(urlItem);
                    json.short_des = $(this).find(paramPostShortdes).text().trim();
                    json.thumb = $(this).find(paramPostThumb).attr('src');
                    var query = {
                        id_post: json.id_post,
                        source: SOURCE
                    };
                    Post.checkExists(query, function (error, post) {
                        if (_.size(post) < 1) {
                            if (error) {
                                helper.writeErrorLog("Error when check Exists" + error);
                            }
                            promiseContent = getContent(urlItem);
                            promiseContent.then(function (resdata) {
                                resdata = resdata.replace(/[\n\t\r]/g, "");
                                json.content = resdata;//.replace(/[\"]/g, "'");
                                if (json.title !== "" && json.url !== "") {
                                    data[index] = json;
                                }
                                count++;
                                console.log("count" + count);
                                if (count == total) {
                                    res.json(data);
                                    insertPost(data, res);
                                }
                            }).catch(function (error) {
                                console.log("error :( " + error);
                                count++;
                            });
                        } else {
                            helper.writeErrorLog("Post already exists " + JSON.stringify(query));
                            count++;
                            if (count == total) {
                                res.json(data);
                                insertPost(data, res);
                            }
                        }
                    });
                }
            });

            //get Image from url to server
            // var destination = fs.createWriteStream('./savedImage.png');
            // request('http://img.f2.thethao.vnecdn.net/2016/07/09/top-1468044285_180x108.jpg')
            //     .pipe(destination)
            //     .on('error', function (error) {
            //         console.log(error);
            //     });
        } else {
            res.json("error " + error);
        }
    });
});

function insertPost(data, res) {
    data = _.compact(data);
    if (_.size(data) >= 1) {
        Post.createManyPost(data, function (err, post) {
            if (err) {
                helper.writeErrorLog("Error when inser many post " + err);
            }
        });
    } else {
        helper.writeErrorLog("All post were exist");
    }
    data = JSON.stringify(data, null, 4);
    var writable = fs.createWriteStream('./data/output.json');
    writable.write(data);
}

function getContent(url) {
    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };
    return rp(options)
        .then(function ($) {
            var contentElement = "";
            if ($("#article_content").html() != null) {
                // article photos
                contentElement = paramPostPhoto;
            } else {
                contentElement = paramPostContent;
            }

            return $(contentElement).html().trim();
            // return entities.decodeHTML(content).trim();
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            return "Error when get content : " + err;
        });
}

module.exports = router;
