/**
 * aide | src/utils/getScrollMax.js
 *
 * ✓ tests
 */

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const win     = window;
const body    = document.body;
const mathMax = Math.max;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

let _getWindowScrollMax;

// -----------------------------------------------------------------------------

// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollMaxX
if (win.scrollMaxX && win.scrollMaxY)
{
    _getWindowScrollMax = function getWindowScrollMaxXY()
    {
        return {
            'x': mathMax(win.scrollMaxX, 0),
            'y': mathMax(win.scrollMaxY, 0)
        };
    };
}
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeftMax
else if (win.scrollTopMax && win.scrollLeftMax)
{
    _getWindowScrollMax = function getWindowScrollMaxTopLeft()
    {
        return {
            'x': mathMax(win.scrollLeftMax, 0),
            'y': mathMax(win.scrollTopMax, 0)
        };
    };
}
else
{
    _getWindowScrollMax = function getWindowScrollMaxScrollInner()
    {
        return {
            'x': mathMax(body.scrollWidth - win.innerWidth, 0),
            'y': mathMax(body.scrollHeight - win.innerHeight, 0)
        };
    };
}

// -----------------------------------------------------------------------------

// return the current scroll position on the window
module.exports = function getScrollMax($target)
{
    if ($target === window)
    {
        return _getWindowScrollMax();
    }

    return {
        'x': ($target.scrollMaxX || $target.scrollLeftMax ||
              ($target.scrollWidth - $target.clientWidth)),

        'y': ($target.scrollMaxY || $target.scrollTopMax ||
              ($target.scrollHeight - $target.clientHeight))
    };
};
