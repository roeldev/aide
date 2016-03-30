/**
 * aide | src/event/ScrollEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
'use strict';

const CustomEvent = require('./utils/CustomEvent');

const addEventListener    = require('./utils/eventListener').add;
const removeEventListener = require('./utils/eventListener').remove;
const getScrollMax        = require('./utils/getScrollMax');
const getScrollPos        = require('./utils/getScrollPos');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const DIRECTION_UP    = 'up';
const DIRECTION_DOWN  = 'down';
const DIRECTION_LEFT  = 'left';
const DIRECTION_RIGHT = 'right';

const EVENT_SCROLL_START = 'scrollstart';
const EVENT_SCROLL_END   = 'scrollend';
const EVENT_SCROLL_UP    = 'scrollup';
const EVENT_SCROLL_DOWN  = 'scrolldown';
const EVENT_SCROLL_LEFT  = 'scrollleft';
const EVENT_SCROLL_RIGHT = 'scrollright';

// -----------------------------------------------------------------------------

const ScrollEventsEmitter = function($target)
{
    this.target = $target;

    this.boundEventListener   = this.eventListener.bind(this);
    this.boundTimeoutCallback = this.timeoutCallback.bind(this);
};

ScrollEventsEmitter.prototype =
{
    /**
     * The target to listen and emit the events to.
     *
     * @type {object}
     */
    'target': null,

    /**
     * Scroll info object of the previous event.
     *
     * @type {object}
     */
    'scrollPrevious': null,

    /**
     * The scroll info object that is most recently created.
     *
     * @type {object}
     */
    'scrollCurrent': null,

    /**
     * The identifier created by setTimeout.
     *
     * @type {number}
     */
    'timeoutId': null,

    /**
     * A flag wich indicates if the emitter is active.
     *
     * @type {boolean}
     */
    'isActive': false,

    /**
     * A flag wich indicates if the scroll event is
     * @type {Boolean}
     */
    'isScrolling': false,

    /**
     * A bound copy of the eventListener function wich is used to listen for
     * scroll events on the target.
     *
     * @type {function}
     */
    'boundEventListener': null,

    /**
     * A bound copy of the timeoutCallback function wich is used to check if
     * the scroll event is still being fired, or if the set timeout has
     * expired, thus the scrolling has ended.
     *
     * @type {function}
     */
    'boundTimeoutCallback': null,

    // -------------------------------------------------------------------------

    /**
     * Activates the emitter by listening to the native scroll event of the
     * target.
     */
    activate: function()
    {
        let $result = false;
        if (!this.isActive)
        {
            this.isActive       = true;
            this.scrollPrevious = this.scrollInfo(false);

            $result = addEventListener(this.target,
                                       'scroll',
                                       this.boundEventListener);
        }

        return $result;
    },

    /**
     * Deactivates the emitter by removing the scroll event from the target.
     */
    deactivate: function()
    {
        let $result = false;
        if (this.isActive)
        {
            $result = removeEventListener(this.target,
                                          'scroll',
                                          this.boundEventListener);

            this.isActive = false;
        }

        return $result;
    },

    /**
     * Calculate all kinds of useful data wich are passed down to the event
     * objects who are emitted and are used to calculate to direction of
     * the scroll movement.
     *
     * @param {object} $prev [null] - The previous scroll info object to compare against
     * @return {object}
     */
    scrollInfo: function($prev = null)
    {
        let $scrollPos = getScrollPos(this.target);
        let $scrollMax = getScrollMax(this.target);

        let $result =
        {
            'scrollX':    $scrollPos.x,
            'scrollY':    $scrollPos.y,
            'scrollMaxX': $scrollMax.x,
            'scrollMaxY': $scrollMax.y
        };

        // the default positions and directions
        $result.positionX  = false;
        $result.positionY  = false;
        $result.directionX = false;
        $result.directionY = false;

        // the target's x/y position in percentages
        if ($result.scrollMaxX > 0)
        {
            $result.positionX = ($result.scrollX / $result.scrollMaxX);
        }

        if ($result.scrollMaxY > 0)
        {
            $result.positionY = ($result.scrollY / $result.scrollMaxY);
        }

        // when no prev object is given, take it from the emitter object
        if (!$prev && $prev !== false)
        {
            $prev = this.scrollPrevious;
        }
        // get the scroll direction relative from the previous position
        if ($prev)
        {
            if ($prev.positionX != $result.positionX)
            {
                $result.directionX = (($prev.positionX < $result.positionX) ?
                                        DIRECTION_RIGHT :
                                        DIRECTION_LEFT);
            }

            if ($prev.positionY != $result.positionY)
            {
                $result.directionY = (($prev.positionY < $result.positionY) ?
                                        DIRECTION_DOWN :
                                        DIRECTION_UP);
            }
        }

        return $result;
    },

    /**
     * Dispatches an event on the target and passes down the current scroll
     * info object.
     *
     * @param {string} $eventType - The type of event to dispatch
     */
    dispatchEvent: function($eventType)
    {
        let $event = new CustomEvent($eventType,
        {
            'detail': this.scrollCurrent
        });

        return this.target.dispatchEvent($event);
    },

    /**
     * The event listener wich handles the native 'scroll' event on the target.
     * It dispatches the 'scrollstart' event when the _isScrolling_ flag is
     * not yet set. It also clears the previous created timeout and adds
     * a new one to check when scrolling has stopped.
     */
    eventListener: function($event)
    {
        // update the current scroll info
        this.scrollPrevious = this.scrollCurrent;
        let $scroll = this.scrollCurrent = this.scrollInfo();

        // dispatch scrollstart event
        if (!this.isScrolling)
        {
            this.isScrolling = true;
            this.dispatchEvent(EVENT_SCROLL_START);
        }

        // dispatch scrollup/scrolldown events
        if ($scroll.directionY === DIRECTION_DOWN)
        {
            this.dispatchEvent(EVENT_SCROLL_DOWN);
        }
        else if ($scroll.directionY === DIRECTION_UP)
        {
            this.dispatchEvent(EVENT_SCROLL_UP);
        }

        // dispatch scrollright/scrollleft events
        if ($scroll.directionX === DIRECTION_RIGHT)
        {
            this.dispatchEvent(EVENT_SCROLL_RIGHT);
        }
        else if ($scroll.directionX === DIRECTION_LEFT)
        {
            this.dispatchEvent(EVENT_SCROLL_LEFT);
        }

        // clear the previous timeout: reset the call to the timeout callback
        // function wich dispatches the scrollend event
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.boundTimeoutCallback, 500);
    },

    /**
     * This function is called when scrolling on the target has stopped for the
     * set amount of time. It dispatches the 'scrollend' event.
     */
    timeoutCallback: function()
    {
        clearTimeout(this.timeoutId);

        this.timeoutId   = false;
        this.isScrolling = false;

        this.dispatchEvent(EVENT_SCROLL_END);
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // //

ScrollEventsEmitter.eventTypes =
[
    EVENT_SCROLL_START,
    EVENT_SCROLL_END,
    EVENT_SCROLL_UP,
    EVENT_SCROLL_DOWN,
    EVENT_SCROLL_LEFT,
    EVENT_SCROLL_RIGHT
];

ScrollEventsEmitter.getScrollMax = getScrollMax;
ScrollEventsEmitter.getScrollPos = getScrollPos;

// -----------------------------------------------------------------------------

module.exports = ScrollEventsEmitter;
