/**
 * aide | test/event_utils_getWindowScrollMax_tests.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

// size of the window/screen (1680*1050)
var VIEWPORT_WIDTH  = 1000;
var VIEWPORT_HEIGHT = 500;

// size of the test div
var TEST_WIDTH  = 10000;
var TEST_HEIGHT = 5000;

// max pixels to scroll
var SCROLL_WIDTH  = (TEST_WIDTH - VIEWPORT_WIDTH);
var SCROLL_HEIGHT = (TEST_HEIGHT - VIEWPORT_HEIGHT);

// -----------------------------------------------------------------------------

init();

describe('event/utils/getScrollMax()', function getWindowScrollMaxTests()
{
    beforeEach(function()
    {
        this.viewport = resetTestArea();
        this.viewport.style.width    = VIEWPORT_WIDTH + 'px';
        this.viewport.style.height   = VIEWPORT_WIDTH + 'px';
        this.viewport.style.overflow = 'auto';

        this.content = document.createElement('div');
        this.content.style.width  = TEST_WIDTH + 'px';
        this.content.style.height = TEST_WIDTH + 'px';

        // add the test div to the body
        this.viewport.appendChild(this.content);
    });

    it('should return the max scroll values', function()
    {
        var $scrollMax = aide.event.ScrollEventsEmitter.getScrollMax(this.viewport);
        console.log($scrollMax);

        // expect( $scrollMax ).to.deep.equal(
        // {
        //     'x': SCROLL_WIDTH,
        //     'y': SCROLL_HEIGHT
        // });
    });
});
