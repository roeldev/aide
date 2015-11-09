/*! aide.state v0.1.0 | GPL-2.0+ License | (c) 2014-2015 Roel Schut | https://github.com/roeldev/aide */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.aide || (g.aide = {})).state = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var UtilsClassList = require('./state/classlist');
var UtilsRegExp = require('./state/regexp');

/**
 * The current used plugin to add/remove and search for classes in the target.
 * @type {string}
 */
var Utils = document.documentElement.classList ? UtilsClassList : UtilsRegExp;

// -----------------------------------------------------------------------------

/**
 * Checks if the <html> element has a class wich represents out flag.
 * It returns `true` when:
 * - the flag is set and the $value param equals `true`;
 * - the flag is not set and the $value param equals `false`;
 * - the flag is set with a value and this value equals the $value param;
 *
 * A `string` with the flags's found value is returned when the $value param
 * equals `true`. Finally, when none of the above conditions are matched
 * the function returns `false`.
 *
 * @param {string} $flag
 * @return {boolean|string}
 */
var API = function API($flag) {
    var $value = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var $found = API.search($flag);

    // result is positive when:
    // - flag is set and $value = true
    // - flag is not set and $value = false
    var $result = $flag === $found && $value === true || !$found && $value === false;

    // when negative result, but with positive search, check if the value (when
    // not true) appended to the flag (with the seperator) equals the found
    // class, otherwise return the found value of the flag
    if (!$result && $found) {
        var $prefix = $flag + API.SEPERATOR;

        $result = $value === true ? $found.substring($prefix.length) : $found === $prefix + $value;
    }

    return $result;
};

/**
 * Searches the target for the specified flag with optional value. It returns a
 * `string` with the full flag's class (including value) when found, or
 * `false` when not found.
 *
 * @param {string} $flag
 * @return {string|boolean}
 */
API.search = function ($flag) {
    return Utils.search(API.TARGET, $flag, API.SEPERATOR);
};

/**
 * Set a global state class flag to the target element.
 *
 * @param {string} $flag
 * @param {string} $value ['']
 * @param {boolean} $bool [true]
 * @return {boolean}
 */
API.set = function ($flag) {
    var $value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var $bool = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    // it is possible to conditionally set or unset a flag/value. when the
    // $bool param is false, unset the (already added) flag.
    if ($bool === false) {
        return API.unset($flag);
    }

    var $result = false;
    var $found = API.search($flag);

    // when we have a valid, non empty value, append it
    // to flag so we get a class like .flag--value
    if (!!$value) {
        $flag += API.SEPERATOR;
    }

    // als we de huidige gesette flagValue terug krijgen,
    // deze verwijderen
    if ($found !== false && $flag != $found) {
        Utils.remove(API.TARGET, $found);
        //API.TARGET.classList.remove($found);
        $found = false;
    }

    // when not already set, add the new flag to the list
    if (!$found) {
        Utils.add(API.TARGET, $flag);
        //API.TARGET.classList.add($flag);
        $result = true;
    }

    return $result;
};

/**
 * Remove a global class flag from the target element.
 *
 * @param {string} $flag
 * @return {boolean}
 */
API.unset = function ($flag) {
    var $result = false;
    var $found = API.search($flag);

    if ($found !== false && $flag != $found) {
        Utils.remove(API.TARGET, $found);
        $result = true;
    }
    return $result;
};

/**
 * Toggle a state class flag on the target element. Set it when it's not
 * already set. Remove it when it is.
 *
 * @param {string} $flag
 * @return {boolean}
 */
API.toggle = function ($flag) {
    var $result = false;
    var $found = API.search($flag);

    if ($found !== false) {
        Utils.remove(API.TARGET, $found);
    } else {
        Utils.add(API.TARGET, $flag);
        $result = true;
    }

    return $result;
};

/**
 * A reference to the <html> element in the document root.
 * @type {HTMLElement}
 */
API.TARGET = document.documentElement;

/**
 * The seperator sequence between a flag and a value (eg. flag--value).
 * @type {string}
 */
API.SEPERATOR = '--';

// -----------------------------------------------------------------------------

// expose both versions of adding/removing/searching for classes so they can be
// tested seperatly
API._classList = UtilsClassList;
API._regExp = UtilsRegExp;

module.exports = API;

},{"./state/classlist":2,"./state/regexp":3}],2:[function(require,module,exports){
'use strict';

module.exports = {

    /**
     * Searches the target's classList for the specified flag. It returns a
     * `string` with the full flag's class (including value) when found,
     * or `false` when not found.
     *
     * @param {HTMLElement} $target
     * @param {string} $flag
     * @param {string} $seperator
     * @return {string|boolean}
     */
    search: function classListSearch($target, $flag, $seperator) {
        var $classList = $target.classList;
        var $result = false;

        // check if the flag without a value is in the classList
        if ($classList.contains($flag)) {
            $result = $flag;
        }
        // when none found, loop through all classes and check if the flag
        // exists with an appended value (eg. .flag--value)
        else {
                // value seperator
                $flag += $seperator;

                var $i = 0;
                var $classListLength = $classList.length;
                var $flagLength = $flag.length;
                var $class = undefined;

                for (; $i < $classListLength; $i++) {
                    $class = $classList[$i];

                    if ($class.indexOf($seperator) && $class.substring(0, $flagLength) == $flag) {
                        $result = $class;
                        break;
                    }
                }
            }

        return $result;
    },

    /**
     * Add the class to the target's classList.
     *
     * @param {HTMLElement} $target
     * @param {string} $className
     */
    add: function classListAdd($target, $className) {
        $target.classList.add($className);
    },

    /**
     * Remove the class from the target's classList.
     *
     * @param {HTMLElement} $target
     * @param {string} $className
     */
    remove: function classListRemove($target, $className) {
        $target.classList.remove($className);
    }
};

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Creates a new RegExp object wich matches the given flag.
 *
 * @param {string} $flag
 * @return {RegExp}
 */
function newRegExp($flag) {
    return new RegExp('(?:^|\\s)' + $flag + '(?!\\S)', 'g');
}

/**
 * Escapes the seperator. Function taken from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *
 * @param {string} $str
 * @return {string}
 */
function escapeRegExp($str) {
    return $str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// -----------------------------------------------------------------------------

module.exports = {

    /**
     * Searches the target's class attribute for the specified flag. It returns
     * a `string` with the full flag's class (including value) when found,
     * or `false` when not found.
     *
     * @param {HTMLElement} $target
     * @param {string} $flag
     * @param {string} $seperator ['--']
     * @return {string|boolean}
     */
    search: function regExpSearch($target, $flag) {
        var $seperator = arguments.length <= 2 || arguments[2] === undefined ? '--' : arguments[2];

        $seperator = escapeRegExp($seperator);

        var $result = false;
        var $found = $target.className.match($flag + $seperator + '.*');

        if ($found) {
            $result = $found[0].split(' ')[0];
        } else if (newRegExp($flag).test($target.className)) {
            $result = $flag;
        }

        return $result;
    },

    /**
     * Add the class to the target's class attribute.
     *
     * @param {HTMLElement} $target
     * @param {string} $className
     */
    add: function regExpAdd($target, $className) {
        $target.className += ' ' + $className;
    },

    /**
     * Remove the class from the target's class attribute.
     *
     * @param {HTMLElement} $target
     * @param {string} $className
     */
    remove: function regExpRemove($target, $className) {
        var $regExp = newRegExp($className);
        $target.className = $target.className.replace($regExp, '');
    }
};

},{}]},{},[1])(1)
});