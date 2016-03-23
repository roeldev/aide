/**
 * aide | src/utils/getScrollPos.js
 */
const doc  = document.documentElement;
const body = document.body;
const win  = window;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

// return the current scroll position on the window
module.exports = function getScrollPos($target)
{
    return {
        'x': $target.scrollX || $target.scrollLeft,
        'y': $target.scrollY || $target.scrollTop
    }
};
