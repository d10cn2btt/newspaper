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
            var logError = "";
            $("#news_home > li").each(function (index) {
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
                    promiseContent.then(function (res) {
                        res = res.replace(/[\n\t\r]/g, "");
                        json.content = res;//.replace(/[\"]/g, "'");
                    });

                    var query = {
                        id_post: json.id_post,
                        source: SOURCE
                    };

                    Post.checkExists(query, function (error, post) {
                        if (error) {
                            helper.writeErrorLog("Error when check Exists" + error);
                        }

                        if (_.size(post) < 1) {
                            if (json.title !== "" && json.url !== "") {
                                data[index] = json;
                            }
                        } else {
                            helper.writeErrorLog("Post already exists " + JSON.stringify(query));
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
            setTimeout(function () {
                // remove post null
                data = _.compact(data);
                Post.createManyPost(data, function (err, post){
                    if (err) {
                        helper.writeErrorLog("Error when inser many post " + err);
                        var writeError = fs.createWriteStream('./data/error.txt', {flags: "a"});
                        writeError.write(logError);
                    }
                });
                data = JSON.stringify(data, null, 4);
                var writable = fs.createWriteStream('./data/output.json');
                writable.write(data);
                res.send(data);
            }, 10000);

        } else {
            res.json("error " + error);
        }
    });
});

function getContent(url) {
    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body, { decodeEntities: false });
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
