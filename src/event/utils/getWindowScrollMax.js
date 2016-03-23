/**
 * aide | src/utils/getWindowScrollMax.js
 */
const body = document.body;
const win  = window;

const mathMax = Math.max;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

let _export;

// -----------------------------------------------------------------------------

// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollMaxX
if (win.scrollMaxX && win.scrollMaxY)
{
    _export = function getWindowScrollMax()
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
    _export = function getWindowScrollMaxTopLeft()
    {
        return {
            'x': mathMax(win.scrollLeftMax, 0),
            'y': mathMax(win.scrollTopMax, 0)
        };
    };
}
else
{
    _export = function getWindowScrollMaxScrollInner()
    {
        return {
            'x': mathMax(body.scrollWidth - win.innerWidth, 0),
            'y': mathMax(body.scrollHeight - win.innerHeight, 0)
        };
    };
}

// -----------------------------------------------------------------------------

module.exports = _export;
