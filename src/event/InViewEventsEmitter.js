/**
 * aide | src/event/InViewEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const InViewEventsEmitter = function($target)
{
};

InViewEventsEmitter.prototype =
{
    activate: function()
    {
    },

    deactivate: function()
    {
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // //

InViewEventsEmitter.eventTypes =
[
    'resizestart', 'resizeend'
]

// -----------------------------------------------------------------------------

module.exports = InViewEventsEmitter;
