var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');// Basically jQuery for node.js
var _ = require("underscore");
var entities = require("entities");
var helper = require("../helper/helper");
var Post = require('../model/post');
var SOURCE = 'thethao.vnexpress.net';
var moment = require('moment');

router.get('/getData', function (req, res, next) {
    url = 'http://thethao.vnexpress.net/';
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var data = new Array();
            var total = 0;
            var count = 0;
            $("#news_home > li").each(function (index) {
                total++;
                console.log("total" + total);
                var json = {id_post: "", title: "", url: "", short_des: "", thumb: "", content: "", source: SOURCE};
                var urlItem = $(this).find("h3.title_news a.txt_link").attr("href");
                var checkExist = false;
                //đề phòng trường hợp thẻ rỗng
                if (!(typeof urlItem === "undefined")) {
                    json.id_post = helper.getIdFormUrl(urlItem);
                    //trim() - remove \r\n and space
                    json.title = $(this).find("h3.title_news").text().trim();
                    json.url = encodeURI(urlItem);
                    json.short_des = $(this).find(".news_lead").text().trim();
                    json.thumb = $(this).find(".thumb img").attr('src');
                    promiseContent = getContent(urlItem);
                    var query = {
                        id_post: json.id_post,
                        source: SOURCE
                    };
                    Post.checkExists(query, function (error, post) {
                        if (_.size(post) < 1) {
                            if (error) {
                                helper.writeErrorLog("Error when check Exists" + error);
                            }
                            promiseContent.then(function (resdata) {
                                resdata = resdata.replace(/[\n\t\r]/g, "");
                                json.content = resdata;//.replace(/[\"]/g, "'");
                                if (json.title !== "" && json.url !== "") {
                                    data[index] = json;
                                }
                                count++;
                                console.log("count" + count);
                                if (count == total - 1) {
                                    insertPost(data, res);
                                }
                            }).catch(function (error) {
                                console.log("error :( " + error);
                                count++;
                            });
                        } else {
                            helper.writeErrorLog("Post already exists " + JSON.stringify(query));
                            count++;
                            if (count == total - 1) {
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
    res.send(data);
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
            // Process html like you would with jQuery...
            var content = $(".fck_detail").html().trim();
            return content;
            return entities.decodeHTML(content).trim();
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            return "Error when get content" + err;
        });
}

router.get('/test', function (req, res, next) {
    res.send("test");
});

module.exports = router;
