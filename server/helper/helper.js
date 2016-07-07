/**
 * Created by Truong on 07-Jul-16.
 */
var helper = {
    getIdFormUrl: function (url) {
        var rgx = /^http:\/\/([a-zA-Z0-9.&-\/]{2,})-([0-9]+)./g;
        var matches = rgx.exec(url);
        return matches[2] ? (isNaN(matches[2]) ? null : matches[2]) : null;
    }
};

module.exports = helper;