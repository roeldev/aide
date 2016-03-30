/**
 * aide | src/event.js
 *
 * - tests
 */
'use strict';

const addEventListener    = require('./event/utils/eventListener').add;
const removeEventListener = require('./event/utils/eventListener').remove;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const _targets  = {};
const _emitters = {};

// -----------------------------------------------------------------------------

const AideEvent = function()
{

};

/**
 * Adds an event listener to the target.
 *
 * @param {object} $target - The target to add the event listener to.
 * @param {array|string} $type - A string representing the event type to listen for.
 * @param {object|boolean} $options [null]
 * @param {function} $listener
 */
AideEvent.on = function($target, $type, $listener)
{
    // default options
    let $options = { 'capture': false };

    if (arguments.length >= 4)
    {
        $options  = arguments[2];
        $listener = arguments[3];

        if ($options === true)
        {
            $options = { 'capture': true };
        }
    }

    // check if the event type is one of the custom types
    if (!!_emitters[$type])
    {
        // when the target does not have a map with registered emitters, create
        // a new one
        if (!_targets[$target])
        {
            _targets[$target] = {};
        }

        // get the class wich is associated with the extra custom event
        let $emitterClass   = _emitters[$type];
        let $targetEmitters = _targets[$target];

        // check if the target already has an emitter of the requested type
        // active
        if (!$targetEmitters[$emitterClass])
        {
            // create a new emitter for the target, save and activate it
            let $emitter = new $emitterClass($target, $options)

            $targetEmitters[$emitterClass] = $emitter;
            $emitter.activate();
        }
    }

    return addEventListener($target, $type, $listener, $options);
};

/**
 * Removes an event listener from the target.
 *
 * @param {object} $target - The the target to remove the event listener from.
 * @param {string} $type - A string representing the event type to remove.
 * @param {object|boolean} $options [null]
 * @param {function} $listener
 */
AideEvent.off = function($target, $type, $listener)
{
    // default options
    let $options = { 'capture': false };

    if (arguments.length >= 4)
    {
        $options  = arguments[2];
        $listener = arguments[3];

        if ($options === true)
        {
            $options = { 'capture': true };
        }
    }

    return removeEventListener($target, $type, $listener, $options);
};

/**
 * Adds an event listener to the target and removes it onces it's triggered.
 *
 * @param {object} $target - The target to add the event listener to.
 * @param {string} $type - A string representing the event type to add and remove.
 * @param {object|boolean} $options [null]
 * @param {function} $listener
 */
AideEvent.once = function($target, $type, $listener)
{
    // default options
    let $options = { 'capture': false };

    if (arguments.length >= 4)
    {
        $options  = arguments[2];
        $listener = arguments[3];

        if ($options === true)
        {
            $options = { 'capture': true };
        }
    }

    $listener = $listener.bind($target);

    let $onceListener = function($e)
    {
        AideEvent.off($target, $type, $onceListener, $options);
        return $listener($e);
    };

    return AideEvent.on($target, $type, $onceListener, $options);
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

(function init($emitters)
{
    for (let $emitter in $emitters)
    {
        let $class  = AideEvent[$emitter] = $emitters[$emitter];
        let $events = $class.eventTypes;

        for (let $j = 0, $jL = $events.length; $j < $jL; $j++)
        {
            _emitters[$events[$j]] = $class;
        }
    }
})(
{
    'InViewEventsEmitter': require('./event/InViewEventsEmitter'),
    'ResizeEventsEmitter': require('./event/ResizeEventsEmitter'),
    'ScrollEventsEmitter': require('./event/ScrollEventsEmitter')
});

// -----------------------------------------------------------------------------

module.exports = AideEvent;
