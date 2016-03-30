/**
 * aide | src/event/ResizeEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const ResizeEventsEmitter = function($target)
{
};

ResizeEventsEmitter.prototype =
{
    activate: function()
    {
    },

    deactivate: function()
    {
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // //

ResizeEventsEmitter.eventTypes =
[
    'resizestart', 'resizeend'
]

// -----------------------------------------------------------------------------

module.exports = ResizeEventsEmitter;
