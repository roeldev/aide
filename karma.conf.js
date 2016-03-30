'use strict';

// load environment variables from .env file
var DotEnv = require('dotenv');
DotEnv.config({ silent: true });

// -----------------------------------------------------------------------------

module.exports = function($config)
{
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY)
    {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
        process.exit(1)
    }

    // example set of browsers to run on Sauce Labs. check out
    // https://saucelabs.com/platforms for all browser/platform combos
    var $sauceCustomLaunchers = require('./.sauce-browsers.json');
    var $sauceBrowsers        = Object.keys($sauceCustomLaunchers);

    $config.set(
    {
        // base path that will be used to resolve all patterns (eg. files,
        // exclude)
        //basePath: '',

        // frameworks to use. available frameworks:
        // https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files/patterns to load in the browser
        files:
        [
            'dist/*.min.js',
            'node_modules/normalize.css/normalize.css',
            'test/**/*.css',
            'test/helpers/*.js',
            'test/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors:
        // https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - IE (only Windows)
        // - PhantomJS
        browsers: [].concat($sauceBrowsers),

        // saucelabs settings
        sauceLabs:
        {
            testName: 'Development',
            tunnelIdentifier: 'karma-sauce-local'
        },

        // saucelab os/browser combinations
        customLaunchers: $sauceCustomLaunchers,

        // test results reporter to use. possible values: 'dots', 'progress'.
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'saucelabs'],

        // enable/disable watching file and executing tests whenever any file
        // changes
        autoWatch: true,

        autoWatchBatchDelay: 1000,

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging. possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
        // config.LOG_INFO || config.LOG_DEBUG
        logLevel: $config.LOG_INFO,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level. how many browser should be started simultanous
        concurrency: Infinity,

        // increase timeout in case connection in CI is slow
        captureTimeout: 120000,
    });
};
