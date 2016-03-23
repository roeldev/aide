/**
 * aide | test/event_utils_getWindowScrollMax_tests.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

// size of the window/screen (1680*1050)
var VIEWPORT_WIDTH  = window.innerWidth;
var VIEWPORT_HEIGHT = window.innerHeight;

// size of the test div
var TEST_WIDTH  = 10000;
var TEST_HEIGHT = 5000;

// -----------------------------------------------------------------------------

init();

describe('event/utils/getWindowScrollMax()', function getWindowScrollMaxTests()
{
    beforeEach(function()
    {
        this.target = resetTestArea();
        this.target.style.width  = TEST_WIDTH + 'px';
        this.target.style.height = TEST_HEIGHT + 'px';

        // console.log('screen: ' + window.screen.width + 'x' + window.screen.height);
        // console.log('viewport: ' + VIEWPORT_WIDTH + 'x' + VIEWPORT_HEIGHT);
        // console.log('inner: ' + document.body.scrollWidth + 'x' + document.body.scrollHeight);

    });

    it('should return the max scroll values', function()
    {
        var $scrollMax = aide.event.ScrollEventsEmitter.getWindowScrollMax();

        expect( $scrollMax ).to.deep.equal(
        {
            'x': SCROLL_WIDTH,
            'y': SCROLL_HEIGHT
        });
    });
});
