/**
 * aide | test/helpers/resetTestArea.js
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

/**
 * Resets the test area by removing the previously added test div and resetting
 * the body.
 *
 * @return {HtmlElement}
 */
var resetTestArea = (function()
{
    var _div;

    return function resetTestArea()
    {
        if (_div)
        {
            document.body.removeChild(_div);
        }

        _div = document.createElement('div');

        // add the test div to the body
        document.body.appendChild(_div);
        window.scrollTo(0, 0);

        return _div;
    };
})();
