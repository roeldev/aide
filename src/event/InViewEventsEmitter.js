/**
 * aide | src/event/InViewEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = class InViewEventsEmitter
{
    static eventTypes()
    {
        return ['inview'];
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
