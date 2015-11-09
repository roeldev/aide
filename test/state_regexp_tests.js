'use strict';

describe('aide.state._regExp.search()', function aideSateRegExpSearchTests()
{
    var $target = document.createElement('div');
    $target.className = 'foo test1 bar test2--value baz';

    it('should return the full class when found', function()
    {
        var $actual = aide.state._regExp.search($target, 'test1');
        expect($actual).to.equal('test1');
    });

    it('should return the full class + value when found', function()
    {
        var $actual = aide.state._regExp.search($target, 'test2');
        expect($actual).to.equal('test2--value');
    });

    it('should return false when not found', function()
    {
        var $actual = aide.state._regExp.search($target, 'not-set');
        expect($actual).to.equal(false);
    });
});
