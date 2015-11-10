'use strict';

module.exports = function($config)
{
    // load basic shared settings
    require('./karma.conf.js')($config);

    // overrule basic settings
    $config.set(
    {
        sauceLabs: {
            startConnect:     false,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors:
        // https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage']
        },

        // test results reporter to use. possible values: 'dots', 'progress'.
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: $config.reporters.concat(['coverage']),

        coverageReporter: {
            type: 'lcovonly',
            dir:  'coverage/',
            file: 'lcov.info'
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
