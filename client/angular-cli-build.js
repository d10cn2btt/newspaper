// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');
var compileSass = require('broccoli-sass');
var mergeTrees = require('broccoli-merge-trees');
var _ = require('lodash');
var glob = require('glob');

module.exports = function (defaults) {
    var sass = mergeTrees(_.map(glob.sync('src/**/*.scss'), function(sassFile) {
        sassFile = sassFile.replace('src/', '');
        var output = sassFile.replace('scss', 'css');
        output = output.replace('sass', 'styles');
        return compileSass(['src'], sassFile, output);
    }));

    var appTree = new Angular2App(defaults, {
        // sassCompiler: {
        //     includePaths: [
        //         'src/styles'
        //     ]
        // },
        vendorNpmFiles: [
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'zone.js/dist/**/*.+(js|js.map)',
            'es6-shim/es6-shim.js',
            'reflect-metadata/**/*.+(ts|js|js.map)',
            'rxjs/**/*.+(js|js.map)',
            '@angular/**/*.+(js|js.map)',
            'underscore/underscore.js',
            'moment/moment.js'
        ]
    });
    return mergeTrees([appTree, sass], { overwrite: true });
};
