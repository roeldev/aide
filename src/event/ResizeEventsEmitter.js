/**
 * aide | src/event/ResizeEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = class ResizeEventsEmitter
{
    static eventTypes()
    {
        return ['resizestart', 'resizeend'];
    }

    // -------------------------------------------------------------------------

    constructor($target)
    {
        this.target = $target;
    }

    activate()
    {
    }

    deactivate()
    {
    }
};
