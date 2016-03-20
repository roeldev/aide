/*! aide v0.1.1 | aide.event | GPL-2.0+ License | (c) 2014-2016 Roel Schut (http://roelschut.nl) | https://github.com/roeldev/aide */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.aide || (g.aide = {})).event = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * aide | src/event.js
 */
'use strict';

/**
 * The current used plugin to add/remove and search for classes in the target.
 * @type {string}
 */
var Utils = require('./event/utils');

// -----------------------------------------------------------------------------

/**
 * Creates a new Map with references to all custom extra events and the classes
 * that emit them.
 *
 * @return {Map}
 */
function createEventsMap() {
    var $result = {};

    for (var $i = 0, $iL = arguments.length; $i < $iL; $i++) {
        var $class = arguments[$i];
        var $events = $class.eventTypes();

        for (var $j = 0, $jL = $events.length; $j < $jL; $j++) {
            $result[$events[$j]] = $class;
        }
    }

    return $result;
}

// -----------------------------------------------------------------------------

var _targets = {};
var _emitters = createEventsMap(require('./event/ResizeEventsEmitter'), require('./event/ScrollEventsEmitter'));

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var AideEvent = function AideEvent() {};

/**
 * Adds an event listener to the target.
 *
 * @param {object} $target - The target to add the event listener to.
 * @param {array|string} $type - A string representing the event type to listen for.
 * @param {object|boolean} $options [null]
 * @param {function} $listener
 */
AideEvent.on = function ($target, $type, $listener) {
    // default options
    var $options = { 'capture': false };

    if (arguments.length >= 4) {
        $options = arguments[2];
        $listener = arguments[3];

        if ($options === true) {
            $options = { 'capture': true };
        }
    }

    // check if the event type is one of the custom types
    if (!!_emitters[$type]) {
        // when the target does not have a map with registered emitters, create
        // a new one
        if (!_targets[$target]) {
            _targets[$target] = {};
        }

        // get the class wich is associated with the extra custom event
        var $emitterClass = _emitters[$type];
        var $targetEmitters = _targets[$target];

        // check if the target already has an emitter of the requested type
        // active
        if (!$targetEmitters[$emitterClass]) {
            // create a new emitter for the target, save and activate it
            var $emitter = new $emitterClass($target, $options);

            $targetEmitters[$emitterClass] = $emitter;
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
AideEvent.off = function ($target, $type, $listener) {
    // default options
    var $options = { 'capture': false };

    if (arguments.length >= 4) {
        $options = arguments[2];
        $listener = arguments[3];

        if ($options === true) {
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
AideEvent.once = function ($target, $type, $listener) {
    // default options
    var $options = { 'capture': false };

    if (arguments.length >= 4) {
        $options = arguments[2];
        $listener = arguments[3];

        if ($options === true) {
            $options = { 'capture': true };
        }
    }

    $listener = $listener.bind($target);

    var $onceListener = function $onceListener($e) {
        AideEvent.off($target, $type, $onceListener, $options);
        return $listener($e);
    };

    return AideEvent.on($target, $type, $onceListener, $options);
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = AideEvent;

},{"./event/ResizeEventsEmitter":2,"./event/ScrollEventsEmitter":3,"./event/utils":4}],2:[function(require,module,exports){
/**
 * aide | src/event/ResizeEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

module.exports = (function () {
    _createClass(ResizeEventsEmitter, null, [{
        key: 'eventTypes',
        value: function eventTypes() {
            return ['resizestart', 'resizeend'];
        }
    }]);

    function ResizeEventsEmitter($target) {
        _classCallCheck(this, ResizeEventsEmitter);

        this.target = $target;
    }

    _createClass(ResizeEventsEmitter, [{
        key: 'activate',
        value: function activate() {
            return Utils.addListener(this.target, 'resize', this.listener);
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            return Utils.removeListener(this.target, 'resize', this.listener);
        }
    }, {
        key: 'listener',
        value: function listener($event) {
            console.log('resize', $event);
        }
    }]);

    return ResizeEventsEmitter;
})();

},{}],3:[function(require,module,exports){
/**
 * aide | src/event/ScrollEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('./utils');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var DIRECTION_UP = 'up';
var DIRECTION_DOWN = 'down';
var DIRECTION_LEFT = 'left';
var DIRECTION_RIGHT = 'right';

var EVENT_SCROLL_START = 'scrollstart';
var EVENT_SCROLL_END = 'scrollend';
var EVENT_SCROLL_UP = 'scrollup';
var EVENT_SCROLL_DOWN = 'scrolldown';
var EVENT_SCROLL_LEFT = 'scrollleft';
var EVENT_SCROLL_RIGHT = 'scrollright';

// -----------------------------------------------------------------------------

/**
 * This function calculates all kinds of useful data wich are passed down to the
 * event objects who are emitted and are used to calculate to direction of the
 * scroll movement.
 *
 * @param {object} $target - The target to get the basic scroll info from
 * @param {object} $prev - The previous scroll info object to compare against
 * @return {object}
 */
function scrollInfo($target, $prev) {
    var $result = {};

    // the target's current scroll x/y pixel positions
    $result.scrollX = $target.scrollX || $target.scrollLeft;
    $result.scrollY = $target.scrollY || $target.scrollTop;

    // the target's max scroll x pixel position
    $result.scrollMaxX = $target.scrollMaxX || $target.scrollLeftMax || $target.scrollWidth - $target.clientWidth;

    // the target's max scroll y pixel position
    $result.scrollMaxY = $target.scrollMaxY || $target.scrollTopMax || $target.scrollHeight - $target.clientHeight;

    // make sure all vars so far are numbers
    if (isNaN($result.scrollX)) {
        $result.scrollX = 0;
    }

    if (isNaN($result.scrollY)) {
        $result.scrollY = 0;
    }

    if (isNaN($result.scrollMaxX)) {
        $result.scrollMaxX = 0;
    }

    if (isNaN($result.scrollMaxY)) {
        $result.scrollMaxY = 0;
    }

    // the default positions and directions
    $result.positionX = false;
    $result.positionY = false;
    $result.directionX = false;
    $result.directionY = false;

    // the target's x/y position in percentages
    if ($result.scrollMaxX > 0) {
        $result.positionX = $result.scrollX / $result.scrollMaxX;
    }

    if ($result.scrollMaxY > 0) {
        $result.positionY = $result.scrollY / $result.scrollMaxY;
    }

    // get the scroll direction relative from the previous position
    if (!!$prev) {
        if ($prev.positionX != $result.positionX) {
            $result.directionX = $prev.positionX < $result.positionX ? DIRECTION_RIGHT : DIRECTION_LEFT;
        }

        if ($prev.positionY != $result.positionY) {
            $result.directionY = $prev.positionY < $result.positionY ? DIRECTION_DOWN : DIRECTION_UP;
        }
    }

    return $result;
}

// -----------------------------------------------------------------------------

module.exports = (function () {
    _createClass(ScrollEventsEmitter, null, [{
        key: 'eventTypes',
        value: function eventTypes() {
            return [EVENT_SCROLL_START, EVENT_SCROLL_END, EVENT_SCROLL_UP, EVENT_SCROLL_DOWN, EVENT_SCROLL_LEFT, EVENT_SCROLL_RIGHT];
        }

        // -------------------------------------------------------------------------

    }]);

    function ScrollEventsEmitter($target) {
        _classCallCheck(this, ScrollEventsEmitter);

        /**
         * The target to listen and emit the events to.
         *
         * @type {object}
         */
        this.target = $target;

        this.scrollPrevious = scrollInfo($target, false);
        this.scrollCurrent;

        /**
         * The identifier created by setTimeout.
         *
         * @type {number}
         */
        this.timeoutId = null;

        /**
         * A flag wich indicates if the emitter is active.
         *
         * @type {boolean}
         */
        this.isActive = false;

        /**
         * A flag wich indicates if the scroll event is
         * @type {Boolean}
         */
        this.isScrolling = false;

        /**
         * A bound copy of the eventListener function wich is used to listen for
         * scroll events on the target.
         *
         * @type {function}
         */
        this.boundEventListener = this.eventListener.bind(this);

        /**
         * A bound copy of the timeoutCallback function wich is used to check if
         * the scroll event is still being fired, or if the set timeout has
         * expired, thus the scrolling has ended.
         *
         * @type {function}
         */
        this.boundTimeoutCallback = this.timeoutCallback.bind(this);
    }

    /**
     * Activates the emitter by listening to the native scroll event of the
     * target.
     */

    _createClass(ScrollEventsEmitter, [{
        key: 'activate',
        value: function activate() {
            var $result = false;
            if (!this.isActive) {
                this.isActive = true;

                $result = Utils.addListener(this.target, 'scroll', this.boundEventListener);
            }

            return $result;
        }

        /**
         * Deactivates the emitter by removing the scroll event from the target.
         */
    }, {
        key: 'deactivate',
        value: function deactivate() {
            var $result = false;
            if (this.isActive) {
                $result = Utils.removeListener(this.target, 'scroll', this.boundEventListener);

                this.isActive = false;
            }

            return $result;
        }

        /**
         * Dispatches an event on the target and passes down the current scroll
         * info object.
         *
         * @param {string} $eventType - The type of event to dispatch
         */
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent($eventType) {
            var $event = Utils.createEvent($eventType, false, true, this.scrollCurrent);
            return this.target.dispatchEvent($event);
        }

        /**
         * The event listener wich handles the native 'scroll' event on the target.
         * It dispatches the 'scrollstart' event when the _isScrolling_ flag is
         * not yet set. It also clears the previous created timeout and adds
         * a new one to check when scrolling has stopped.
         */
    }, {
        key: 'eventListener',
        value: function eventListener($event) {
            // update the current scroll info
            this.scrollPrevious = this.scrollCurrent;
            var $scroll = this.scrollCurrent = scrollInfo(this.target, this.scrollPrevious);

            // dispatch scrollstart event
            if (!this.isScrolling) {
                this.isScrolling = true;
                this.dispatchEvent(EVENT_SCROLL_START);
            }

            // dispatch scrollup/scrolldown events
            if ($scroll.directionY === DIRECTION_DOWN) {
                this.dispatchEvent(EVENT_SCROLL_DOWN);
            } else if ($scroll.directionY === DIRECTION_UP) {
                this.dispatchEvent(EVENT_SCROLL_UP);
            }

            // dispatch scrollright/scrollleft events
            if ($scroll.directionX === DIRECTION_RIGHT) {
                this.dispatchEvent(EVENT_SCROLL_RIGHT);
            } else if ($scroll.directionX === DIRECTION_LEFT) {
                this.dispatchEvent(EVENT_SCROLL_LEFT);
            }

            // clear the previous timeout: reset the call to the timeout callback
            // function wich dispatches the scrollend event
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(this.boundTimeoutCallback, 500);
        }

        /**
         * This function is called when scrolling on the target has stopped for the
         * set amount of time. It dispatches the 'scrollend' event.
         */
    }, {
        key: 'timeoutCallback',
        value: function timeoutCallback() {
            clearTimeout(this.timeoutId);

            this.timeoutId = false;
            this.isScrolling = false;

            this.dispatchEvent(EVENT_SCROLL_END);
        }
    }]);

    return ScrollEventsEmitter;
})();

},{"./utils":4}],4:[function(require,module,exports){
/**
 * aide | src/event/utils.js
 */
'use strict';

var UtilsStandard = require('./utils/standard');
var UtilsLegacy = require('./utils/legacy');

/**
 * The current used plugin to add/remove and search for classes in the target.
 * @type {string}
 */
var Utils = !document.addEventListener ? UtilsLegacy : UtilsStandard;

// -----------------------------------------------------------------------------

// expose both standard and legacy versions of adding/removing events so they
// can be tested seperatly
Utils._standard = UtilsStandard;
Utils._legacy = UtilsLegacy;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = Utils;

},{"./utils/legacy":5,"./utils/standard":6}],5:[function(require,module,exports){
/**
 * aide | src/events/utils/legacy.js
 */
'use strict';

module.exports = {
    addListener: function addListener($target, $type, $listener) {
        $type = 'on' + $type;

        if ($target.attachEvent) {
            return $target.attachEvent($type, $listener);
        } else {
            if (typeof $target[$type] === 'function') {
                (function () {
                    var $previousListener = $target[$type];
                    $target[$type] = function ($e) {
                        $previousListener($e);
                        $listener($e);
                    };
                })();
            } else {
                $target[$type] = $listener;
            }

            return true;
        }
    },

    removeListener: function removeListener($target, $type, $listener) {
        $type = 'on' + $type;
        if ($target.detachEvent) {
            return $target.detachEvent($type, $listener);
        } else {
            $target[$type] = null;
            return true;
        }
    },

    /**
     * Creates a CustomEvent object
     * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
     *
     * @param {string} $type - The type of event to create
     * @param {boolean} $bubbles [false]
     * @param {boolean} $cancelable [false]
     * @param {object} $detail [null]
     * @return {object}
     */
    createEvent: function createEvent($type) {
        var $bubbles = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var $cancelable = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var $detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

        var $result = document.createEvent('CustomEvent');
        $result.initCustomEvent($type, $bubbles, $cancelable, $detail);

        return $result;
    }
};

},{}],6:[function(require,module,exports){
/**
 * aide | src/events/utils/standard.js
 */
'use strict';

module.exports = {
    addListener: function addListener($target, $type, $listener, $useCapture) {
        // convert arguments to an array and remove the first value
        var $args = Array.apply(null, arguments).slice(1);
        return $target.addEventListener.apply($target, $args);
    },

    removeListener: function removeListener($target, $type, $listener, $useCapture) {
        // convert arguments to an array and remove the first value
        var $args = Array.apply(null, arguments).slice(1);
        return $target.removeEventListener.apply($target, $args);
    },

    /**
     * Creates a CustomEvent object
     *
     * @param {string} $type - The type of event to create
     * @param {boolean} $bubbles [false]
     * @param {boolean} $cancelable [false]
     * @param {object} $detail [null]
     * @return {object}
     */
    createEvent: function createEvent($type) {
        var $bubbles = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var $cancelable = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var $detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

        return new CustomEvent($type, {
            'bubbles': $bubbles,
            'cancelable': $cancelable,
            'detail': $detail
        });
    }
};

},{}]},{},[1])(1)
});