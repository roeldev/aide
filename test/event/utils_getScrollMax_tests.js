/**
 * aide | test/event/utils_getScrollMax.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

initTestPage();

var getScrollMax = aide.event.ScrollEventsEmitter.getScrollMax;

// -----------------------------------------------------------------------------

describe('event/utils/getScrollMax()', function()
{
    it('should return the max scroll values of the window', function()
    {
        // size of the window/screen (1680*1050) without borders etc.
        var VIEWPORT_WIDTH  = window.innerWidth;
        var VIEWPORT_HEIGHT = window.innerHeight;

        // size of the test div
        var TEST_WIDTH  = 10000;
        var TEST_HEIGHT = 5000;

        // ---------------------------------------------------------------------

        var $target = resetTestPage();
        $target.style.width  = TEST_WIDTH + 'px';
        $target.style.height = TEST_HEIGHT + 'px';

        var $actual = getScrollMax(window);
        expect( $actual ).to.deep.equal(
        {
            'x': (TEST_WIDTH - VIEWPORT_WIDTH),
            'y': (TEST_HEIGHT - VIEWPORT_HEIGHT)
        });
    });

    it('should return the max scroll values of the div', function()
    {
        // size of the content test div inside the viewport
        var TEST_WIDTH  = 10000;
        var TEST_HEIGHT = 5000;

        // ---------------------------------------------------------------------

        var $target        = resetTestPage();
        var $scrollContent = document.createElement('div');

        // add the content div to scroll to the test area div
        $target.appendChild($scrollContent);

        $target.style.width    = '1000px';
        $target.style.height   = '500px';
        $target.style.overflow = 'auto';

        $scrollContent.style.width  = TEST_WIDTH + 'px';
        $scrollContent.style.height = TEST_HEIGHT + 'px';

        var $actual = getScrollMax($target);
        expect( $actual ).to.deep.equal(
        {
            'x': (TEST_WIDTH - $target.clientWidth),
            'y': (TEST_HEIGHT - $target.clientHeight)
        });
    });

    it('should return the max scroll values of the textarea', function()
    {
        // size of the content test div inside the viewport
        var TEST_WIDTH  = 1000;
        var TEST_HEIGHT = 500;

        // ---------------------------------------------------------------------

        var $testArea = resetTestPage();
        var $target   = document.createElement('textarea');

        // add the test div to the body
        $testArea.appendChild($target);

        $target.style.width  = TEST_WIDTH + 'px';
        $target.style.height = TEST_HEIGHT + 'px';
        $target.value        = '';

        // add a bunch of newlines inside the texarea to create a scroll area
        for (var $i = 0; $i < 1000; $i++)
        {
            $target.value += $i + '\n';
        }

        var $actual = getScrollMax($target);
        expect( $actual ).to.deep.equal(
        {
            'x': ($target.scrollWidth - $target.clientWidth),
            'y': ($target.scrollHeight - $target.clientHeight)
        });
    });
});
