/**
 * aide | src/utils/getScrollPos.js
 *
 * ✓ tests
 */

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const isNaN = Number.isNaN;

// return the current scroll position on the window
module.exports = function getScrollPos($target)
{
    let $x = $target.scrollX || $target.scrollLeft;
    let $y = $target.scrollY || $target.scrollTop

    return {
        'x': $x || 0,
        'y': $y || 0
    };
};
