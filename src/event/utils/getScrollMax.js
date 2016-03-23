/**
 * aide | src/utils/getScrollMax.js
 */

// // // // // // // // // // // // // // // // // // // // // // // // // // //

// return the current scroll position on the window
module.exports = function getScrollMax($target)
{
    return {
        'x': $target.scrollMaxX || $target.scrollLeftMax || ($target.scrollWidth - $target.clientWidth),
        'y': $target.scrollMaxY || $target.scrollTopMax || ($target.scrollHeight - $target.clientHeight)
    };
};
