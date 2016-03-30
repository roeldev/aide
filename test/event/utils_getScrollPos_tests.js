/**
 * aide | test/event/utils_getScrollPos.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

initTestPage();

var getScrollPos = aide.event.ScrollEventsEmitter.getScrollPos;

// -----------------------------------------------------------------------------

describe('event/utils/getScrollPos()', function()
{
    it('should return the scroll position of the window', function()
    {
        // scroll position of the window
        var SCROLL_X = 100;
        var SCROLL_Y = 50;

        // ---------------------------------------------------------------------

        var $target = resetTestPage();
        $target.style.width  = '10000px';
        $target.style.height = '5000px';

        window.scrollTo(100, 50);

        var $actual = getScrollPos(window);
        expect( $actual ).to.deep.equal(
        {
            'x': SCROLL_X,
            'y': SCROLL_Y
        });
    });

    it('should return the scroll position of the div', function()
    {
        // scroll position inside the div
        var SCROLL_X = 100;
        var SCROLL_Y = 50;

        // ---------------------------------------------------------------------

        var $target        = resetTestPage();
        var $scrollContent = document.createElement('div');

        // add the content div to scroll to the test area div
        $target.appendChild($scrollContent);

        $scrollContent.style.width  = '2000px';
        $scrollContent.style.height = '1000px';

        $target.style.width    = '1000px';
        $target.style.height   = '500px';
        $target.style.overflow = 'auto';
        $target.scrollTop      = SCROLL_Y;
        $target.scrollLeft     = SCROLL_X;

        var $actual = getScrollPos($target);
        expect( $actual ).to.deep.equal(
        {
            'x': SCROLL_X,
            'y': SCROLL_Y
        });
    });

    it('should return the scroll position of the textarea', function()
    {
        // scroll position inside the textarea
        var SCROLL_Y = 345;

        // ---------------------------------------------------------------------

        var $testArea = resetTestPage();
        var $target   = document.createElement('textarea');

        // add the texatrea to the test div
        $testArea.appendChild($target);

        $target.style.width  = '1000px';
        $target.style.height = '500px';

        // add a bunch of newlines inside the texarea to create a scroll area
        for (var $i = 0; $i < 1000; $i++)
        {
            $target.value += $i + '\n';
        }

        $target.scrollTop = SCROLL_Y;

        var $actual = getScrollPos($target);
        expect( $actual ).to.deep.equal(
        {
            'x': 0,
            'y': SCROLL_Y
        });
    });
});
