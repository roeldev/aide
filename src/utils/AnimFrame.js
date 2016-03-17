/**
 * aide | src/utils/AnimFrame.js
 */
'use strict';

const cancelFrame  = window.cancelAnimationFrame;
const requestFrame = window.requestAnimationFrame;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = class AnimFrame
{
    constructor()
    {
        this.requestId = null;
        this.isQueued  = false;
    }

    request($handle)
    {
        if (!this.isQueued)
        {
            this.requestId = requestFrame($handle);
            this.isQueued  = true;
        }
    }

    cancel()
    {
        if (isQueued)
        {
            cancelFrame(requestId);
            this.isQueued = false;
        }
    }
};
