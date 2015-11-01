'use strict';

var Expect = chai.expect;

//------------------------------------------------------------------------------

describe('test', function initTests()
{
    it('success', function()
    {
        Expect(1).to.equal(1);
    });

    it('failure', function()
    {
        Expect(1).to.equal(0);
    });
});
