/**
 * aide | test/state_regexp_tests.js
 */
'use strict';

describe('aide.state._regExp.search()', function aideSateRegExpSearchTests()
{
    beforeEach(function()
    {
        this.target = document.createElement('div');
        this.target.className = 'foo test1 bar test2--value baz';
    });

    it('return the full class when found', function()
    {
        var $actual = aide.state._regExp.search(this.target, 'test1');
        expect($actual).to.equal('test1');
    });

    it('return the full class + value when found', function()
    {
        var $actual = aide.state._regExp.search(this.target, 'test2');
        expect($actual).to.equal('test2--value');
    });

    it('return false when not found', function()
    {
        var $actual = aide.state._regExp.search(this.target, 'not-set');
        expect($actual).to.equal(false);
    });
});
