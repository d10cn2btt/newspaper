var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _ = require("underscore");
var helper = require("../helper/helper");

router.get('/getData', function (req, res, next) {
    url = 'http://thethao.vnexpress.net/';
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var data = new Array();

            $("#news_home > li").each(function (index) {
                var json = {id: "", title: "", url: "", short_des: ""};
                var urlItem = $(this).find("h3.title_news a.txt_link").attr("href");
                //đề phòng trường hợp thẻ rỗng
                if (!(typeof urlItem === "undefined")) {
                    json.id = helper.getIdFormUrl(urlItem);
                    json.title = $(this).find("h3.title_news").text();
                    json.url = encodeURI(urlItem);
                    json.short_des = $(this).find(".news_lead").text();
                    if (json.title !== "" && json.url !== "")
                        data[index] = json;
                }

            });
            data = JSON.stringify(data, null, 4);
            var writable = fs.createWriteStream('./data/output.json');
            writable.write(data);
            res.send(data);
        } else {
            res.json("error " + error);
        }
    });
});

router.get('/btt', function (req, res, next) {
    res.json('respond BTT');
});

module.exports = router;
