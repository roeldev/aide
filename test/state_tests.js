/**
 * aide | test/state_regexp_tests.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

initTestPage();

// -----------------------------------------------------------------------------

describe('aide.state()', function aideSateTests()
{
    beforeEach(function()
    {
        resetTestPage();

        document.documentElement.className = 'foo test1 bar test2--value baz';
    });

    it('return true when the flag is set', function()
    {
        var $actual = aide.state('test1');
        expect($actual).to.equal(true);
    });

    it('return false when the flag is not set', function()
    {
        var $actual = aide.state('not-set');
        expect($actual).to.equal(false);
    });

    it('return true when the flag is expected to be not set', function()
    {
        var $actual = aide.state('not-set', false);
        expect($actual).to.equal(true);
    });

    it('return true when the flag has the expected value', function()
    {
        var $actual = aide.state('test2', 'value');
        expect($actual).to.equal(true);
    });
});
