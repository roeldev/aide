/**
 * aide | src/events.js
 */
'use strict';

const USE_LEGACY = !document.addEventListener;

const UtilsStandard = require('./events/standard');
const UtilsLegacy   = require('./events/legacy');

/**
 * The current used plugin to add/remove and search for classes in the target.
 * @type {string}
 */
const Utils = (USE_LEGACY ? UtilsLegacy : UtilsStandard);

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var AideEvents = function()
{

};

AideEvents.on = function($element, $type, $listener, $useCapture = false)
{
    return Utils.add($element, $type, $listener, $useCapture);
};

AideEvents.off = function($element, $type, $listener, $useCapture = false)
{
    return Utils.remove($element, $type, $listener, $useCapture);
};

AideEvents.once = function($element, $type, $listener, $useCapture = false)
{
    var $onceListener = function($e)
    {
        $listener($e).bind($element);
        Utils.remove($element, $type, $onceListener, $useCapture);

        return $result;
    };

    return Utils.add($element, $type, $onceListener, $useCapture);
};

/**
 * The seperator sequence between a flag and a value (eg. flag--value).
 * @type {string}
 */
AideEvents.USE_LEGACY = USE_LEGACY;

// -----------------------------------------------------------------------------

// expose both standard and legacy versions of adding/removing events so they
// can be tested seperatly
AideEvents._standard = UtilsStandard;
AideEvents._legacy   = UtilsLegacy;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = AideEvents;
