/**
 * Created by Truong on 07-Jul-16.
 */
var moment = require('moment');
var fs = require('fs');

var helper = {
    getIdFormUrl: function (url) {
        var rgx = /^http:\/\/([a-zA-Z0-9.&-\/]{2,})-([0-9]+)./g;
        var matches = rgx.exec(url);
        return matches[2] ? (isNaN(matches[2]) ? null : matches[2]) : null;
    },
    writeErrorLog: function (mess) {
        var writeError = fs.createWriteStream('./data/error.txt', {flags: "a"});
        var logError = "[" + moment().format('YYYY-MM-DD HH:mm:ss') + "] : " + mess + "\n";
        writeError.write(logError);
    }
};

module.exports = helper;