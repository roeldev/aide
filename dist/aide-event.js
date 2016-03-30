/*! aide v0.1.1 | aide.event | GPL-2.0+ License | (c) 2014-2016 Roel Schut (http://roelschut.nl) | https://github.com/roeldev/aide */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.aide || (g.aide = {})).event = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * aide | src/event.js
 *
 * - tests
 */
'use strict';

var addEventListener = require('./event/utils/eventListener').add;
var removeEventListener = require('./event/utils/eventListener').remove;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var _targets = {};
var _emitters = {};

// -----------------------------------------------------------------------------

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

(function init($emitters) {
    for (var $emitter in $emitters) {
        var $class = AideEvent[$emitter] = $emitters[$emitter];
        var $events = $class.eventTypes;

        for (var $j = 0, $jL = $events.length; $j < $jL; $j++) {
            _emitters[$events[$j]] = $class;
        }
    }
})({
    'InViewEventsEmitter': require('./event/InViewEventsEmitter'),
    'ResizeEventsEmitter': require('./event/ResizeEventsEmitter'),
    'ScrollEventsEmitter': require('./event/ScrollEventsEmitter')
});

// -----------------------------------------------------------------------------

module.exports = AideEvent;

},{"./event/InViewEventsEmitter":2,"./event/ResizeEventsEmitter":3,"./event/ScrollEventsEmitter":4,"./event/utils/eventListener":6}],2:[function(require,module,exports){
/**
 * aide | src/event/InViewEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var InViewEventsEmitter = function InViewEventsEmitter($target) {};

InViewEventsEmitter.prototype = {
    activate: function activate() {},

    deactivate: function deactivate() {}
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

InViewEventsEmitter.eventTypes = ['resizestart', 'resizeend'];

// -----------------------------------------------------------------------------

module.exports = InViewEventsEmitter;

},{}],3:[function(require,module,exports){
/**
 * aide | src/event/ResizeEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
'use strict';

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var ResizeEventsEmitter = function ResizeEventsEmitter($target) {};

ResizeEventsEmitter.prototype = {
    activate: function activate() {},

    deactivate: function deactivate() {}
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

ResizeEventsEmitter.eventTypes = ['resizestart', 'resizeend'];

// -----------------------------------------------------------------------------

module.exports = ResizeEventsEmitter;

},{}],4:[function(require,module,exports){
/**
 * aide | src/event/ScrollEventsEmitter.js
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
'use strict';

var CustomEvent = require('./utils/CustomEvent');

var addEventListener = require('./utils/eventListener').add;
var removeEventListener = require('./utils/eventListener').remove;
var getScrollMax = require('./utils/getScrollMax');
var getScrollPos = require('./utils/getScrollPos');

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

var ScrollEventsEmitter = function ScrollEventsEmitter($target) {
    this.target = $target;

    this.boundEventListener = this.eventListener.bind(this);
    this.boundTimeoutCallback = this.timeoutCallback.bind(this);
};

ScrollEventsEmitter.prototype = {
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
    activate: function activate() {
        var $result = false;
        if (!this.isActive) {
            this.isActive = true;
            this.scrollPrevious = this.scrollInfo(false);

            $result = addEventListener(this.target, 'scroll', this.boundEventListener);
        }

        return $result;
    },

    /**
     * Deactivates the emitter by removing the scroll event from the target.
     */
    deactivate: function deactivate() {
        var $result = false;
        if (this.isActive) {
            $result = removeEventListener(this.target, 'scroll', this.boundEventListener);

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
    scrollInfo: function scrollInfo() {
        var $prev = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        var $scrollPos = getScrollPos(this.target);
        var $scrollMax = getScrollMax(this.target);

        var $result = {
            'scrollX': $scrollPos.x,
            'scrollY': $scrollPos.y,
            'scrollMaxX': $scrollMax.x,
            'scrollMaxY': $scrollMax.y
        };

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

        // when no prev object is given, take it from the emitter object
        if (!$prev && $prev !== false) {
            $prev = this.scrollPrevious;
        }
        // get the scroll direction relative from the previous position
        if ($prev) {
            if ($prev.positionX != $result.positionX) {
                $result.directionX = $prev.positionX < $result.positionX ? DIRECTION_RIGHT : DIRECTION_LEFT;
            }

            if ($prev.positionY != $result.positionY) {
                $result.directionY = $prev.positionY < $result.positionY ? DIRECTION_DOWN : DIRECTION_UP;
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
    dispatchEvent: function dispatchEvent($eventType) {
        var $event = new CustomEvent($eventType, {
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
    eventListener: function eventListener($event) {
        // update the current scroll info
        this.scrollPrevious = this.scrollCurrent;
        var $scroll = this.scrollCurrent = this.scrollInfo();

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
    },

    /**
     * This function is called when scrolling on the target has stopped for the
     * set amount of time. It dispatches the 'scrollend' event.
     */
    timeoutCallback: function timeoutCallback() {
        clearTimeout(this.timeoutId);

        this.timeoutId = false;
        this.isScrolling = false;

        this.dispatchEvent(EVENT_SCROLL_END);
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

ScrollEventsEmitter.eventTypes = [EVENT_SCROLL_START, EVENT_SCROLL_END, EVENT_SCROLL_UP, EVENT_SCROLL_DOWN, EVENT_SCROLL_LEFT, EVENT_SCROLL_RIGHT];

ScrollEventsEmitter.getScrollMax = getScrollMax;
ScrollEventsEmitter.getScrollPos = getScrollPos;

// -----------------------------------------------------------------------------

module.exports = ScrollEventsEmitter;

},{"./utils/CustomEvent":5,"./utils/eventListener":6,"./utils/getScrollMax":7,"./utils/getScrollPos":8}],5:[function(require,module,exports){
/**
 * aide | src/event/utils/CustomEvent.js
 *
 * - tests
 */

'use strict';

var win = window;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

// Polyfill example taken from
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
var CustomEventPolyfill = function CustomEventPolyfill($type, $options) {
    var $result = document.createEvent('CustomEvent');
    $result.initCustomEvent($type, $options.bubbles, $options.cancelable, $options.detail);

    return $result;
};

CustomEventPolyfill.prototype = win.Event.prototype;

// -----------------------------------------------------------------------------

module.exports = typeof win.CustomEvent !== 'function' ? CustomEventPolyfill : win.CustomEvent;

},{}],6:[function(require,module,exports){
/**
 * aide | src/event/utils/eventListener.js
 *
 * - tests
 */

'use strict';

var win = window;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var _apiAdd = undefined;
var _apiRemove = undefined;

// -----------------------------------------------------------------------------

if (win.addEventListener) {
    _apiAdd = function eventAddListener($target, $type, $listener, $useCapture) {
        return $target.addEventListener($type, $listener, $useCapture);
    };

    _apiRemove = function eventRemoveListener($target, $type, $listener, $useCapture) {
        return $target.removeEventListener($type, $listener, $useCapture);
    };
}
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/attachEvent
else if (win.attachEvent) {
        _apiAdd = function eventAddListenerIE($target, $type, $listener) {
            return $target.attachEvent('on' + $type, $listener);
        };

        _apiRemove = function eventRemoveListenerIE($target, $type, $listener) {
            return $target.detachEvent('on' + $type, $listener);
        };
    } else {
        _apiAdd = function eventAddListenerLegacy($target, $type, $listener) {
            $type = 'on' + $type;
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
        };

        _apiRemove = function eventRemoveListenerLegacy($target, $type, $listener) {
            $target[$type] = null;
            return true;
        };
    }

// -----------------------------------------------------------------------------

module.exports = {
    'add': _apiAdd,
    'remove': _apiRemove
};

},{}],7:[function(require,module,exports){
/**
 * aide | src/utils/getScrollMax.js
 *
 * ✓ tests
 */

// // // // // // // // // // // // // // // // // // // // // // // // // // //

'use strict';

var win = window;
var body = document.body;
var mathMax = Math.max;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

var _getWindowScrollMax = undefined;

// -----------------------------------------------------------------------------

// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollMaxX
if (win.scrollMaxX && win.scrollMaxY) {
    _getWindowScrollMax = function getWindowScrollMaxXY() {
        return {
            'x': mathMax(win.scrollMaxX, 0),
            'y': mathMax(win.scrollMaxY, 0)
        };
    };
}
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeftMax
else if (win.scrollTopMax && win.scrollLeftMax) {
        _getWindowScrollMax = function getWindowScrollMaxTopLeft() {
            return {
                'x': mathMax(win.scrollLeftMax, 0),
                'y': mathMax(win.scrollTopMax, 0)
            };
        };
    } else {
        _getWindowScrollMax = function getWindowScrollMaxScrollInner() {
            return {
                'x': mathMax(body.scrollWidth - win.innerWidth, 0),
                'y': mathMax(body.scrollHeight - win.innerHeight, 0)
            };
        };
    }

// -----------------------------------------------------------------------------

// return the current scroll position on the window
module.exports = function getScrollMax($target) {
    if ($target === window) {
        return _getWindowScrollMax();
    }

    return {
        'x': $target.scrollMaxX || $target.scrollLeftMax || $target.scrollWidth - $target.clientWidth,

        'y': $target.scrollMaxY || $target.scrollTopMax || $target.scrollHeight - $target.clientHeight
    };
};

},{}],8:[function(require,module,exports){
/**
 * aide | src/utils/getScrollPos.js
 *
 * ✓ tests
 */

// // // // // // // // // // // // // // // // // // // // // // // // // // //

'use strict';

var isNaN = Number.isNaN;

// return the current scroll position on the window
module.exports = function getScrollPos($target) {
    var $x = $target.scrollX || $target.scrollLeft;
    var $y = $target.scrollY || $target.scrollTop;

    return {
        'x': $x || 0,
        'y': $y || 0
    };
};

},{}]},{},[1])(1)
});