/**
 * aide | test/event_utils_getWindowScrollPos_tests.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

// size of the window/screen (1680*1050)
var VIEWPORT_WIDTH  = window.innerWidth;
var VIEWPORT_HEIGHT = window.innerHeight;

// size of the test div
var TEST_WIDTH  = 10000;
var TEST_HEIGHT = 5000;

// max pixels to scroll
var SCROLL_WIDTH  = (TEST_WIDTH - VIEWPORT_WIDTH);
var SCROLL_HEIGHT = (TEST_HEIGHT - VIEWPORT_HEIGHT);

// -----------------------------------------------------------------------------

var _div;

// -----------------------------------------------------------------------------

init();

describe('event/utils/getWindowScrollPos()', function getWindowScrollPosTests()
{
    beforeEach(function()
    {
        this.target = resetTestArea();
        this.target.style.width  = TEST_WIDTH + 'px';
        this.target.style.height = TEST_HEIGHT + 'px';

        // console.log('screen: ' + window.screen.width + 'x' + window.screen.height);
        // console.log('viewport: ' + VIEWPORT_WIDTH + 'x' + VIEWPORT_HEIGHT);
    });

    it('should return the scroll positions', function()
    {
        window.scrollTo(50, 50);

        // console.log('scrollX', window.scrollX, window.scrollLeft);
    });
});
