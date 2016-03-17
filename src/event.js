/**
 * aide | src/event.js
 */
'use strict';

/**
 * The current used plugin to add/remove and search for classes in the target.
 * @type {string}
 */
const Utils = require('./event/utils');

// -----------------------------------------------------------------------------

/**
 * Creates a new Map with references to all custom extra events and the classes
 * that emit them.
 *
 * @return {Map}
 */
function createEventsMap()
{
    let $result = new Map();

    for (let $i = 0, $iL = arguments.length; $i < $iL; $i++)
    {
        let $class  = arguments[$i];
        let $events = $class.eventTypes();

        for (let $j = 0, $jL = $events.length; $j < $jL; $j++)
        {
            $result.set($events[$j], $class);
        }
    }

    return $result;
}

// -----------------------------------------------------------------------------

const _targets  = new Map();
const _emitters = createEventsMap(
    require('./event/ResizeEventsEmitter'),
    require('./event/ScrollEventsEmitter')
);

// // // // // // // // // // // // // // // // // // // // // // // // // // //

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
    if (_emitters.has($type))
    {
        // when the target does not have a map with registered emitters, create
        // a new one
        if (!_targets.has($target))
        {
            _targets.set($target, new Map());
        }

        // get the class wich is associated with the extra custom event
        let $emitterClass   = _emitters.get($type);
        let $targetEmitters = _targets.get($target);

        // check if the target already has an emitter of the requested type
        // active
        if (!$targetEmitters.has($emitterClass))
        {
            // create a new emitter for the target, save and activate it
            let $emitter = new $emitterClass($target, $options)

            $targetEmitters.set($emitterClass, $emitter);
            $emitter.activate();
        }
    }

    return Utils.addListener($target, $type, $listener, $options);
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

    return Utils.removeListener($target, $type, $listener, $options);
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

module.exports = AideEvent;
