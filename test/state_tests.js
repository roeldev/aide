'use strict';

var DOC = document.documentElement;

// -----------------------------------------------------------------------------

describe('Aide.State()', function aideSateTests()
{
    it('should return true when the flag is set', function()
    {
        DOC.className += ' test1';

        expect(Aide.State('test1')).to.equal(true);
    });

    it('should return false when the flag is not set', function()
    {
        expect(Aide.State('not-set')).to.equal(false);
    });

    it('should return true when the flag is expected to be not set', function()
    {
        expect(Aide.State('not-set', false)).to.equal(true);
    });

    it('should return true when the flag has the expected value', function()
    {
        DOC.className += ' test2--value';

        var $actual = Aide.State('test2', 'value');
        expect($actual).to.equal('value');
    });
});
