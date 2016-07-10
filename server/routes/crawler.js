var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');// Basically jQuery for node.js
var _ = require("underscore");
var helper = require("../helper/helper");

router.get('/getData', function (req, res, next) {
    url = 'http://thethao.vnexpress.net/';
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var data = new Array();
            $("#news_home > li").each(function (index) {
                var json = {id: "", title: "", url: "", short_des: "", thumb: "", content: ""};
                var urlItem = $(this).find("h3.title_news a.txt_link").attr("href");
                //đề phòng trường hợp thẻ rỗng
                if (!(typeof urlItem === "undefined")) {
                    json.id = helper.getIdFormUrl(urlItem);
                    //trim() - remove \r\n and space
                    json.title = $(this).find("h3.title_news").text().trim();
                    json.url = encodeURI(urlItem);
                    json.short_des = $(this).find(".news_lead").text().trim();
                    json.thumb = $(this).find(".thumb img").attr('src');
                    promiseContent = getContent(urlItem);
                    promiseContent.then(function (res) {
                        json.content = res;
                    });
                    if (json.title !== "" && json.url !== "")
                        data[index] = json;
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
                data = JSON.stringify(data, null, 4);
                var writable = fs.createWriteStream('./data/output.json');
                writable.write(data);
                res.send(data);
            }, 2000);

        } else {
            res.json("error " + error);
        }
    });
});

function getContent(url) {
    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            return $(".fck_detail").text().trim();
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            return "Error when get content"+err;
        });
}

router.get('/btt', function (req, res, next) {
    res.json('respond BTT');
});

module.exports = router;
