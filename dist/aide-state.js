/*! Aide.State v0.0.0 | GPL-2.0+ License | (c) 2014-2015 Roel Schut | https://github.com/roeldev/aide */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.Aide || (g.Aide = {})).State = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = document.documentElement.classList ? require('./state/api-classlist.js') : require('./state/api-regexp.js');

},{"./state/api-classlist.js":2,"./state/api-regexp.js":3}],2:[function(require,module,exports){
'use strict';

/**
 * A reference to the <html> element in the document root.
 * @type {HTMLElement}
 */
var TARGET = document.documentElement;

//------------------------------------------------------------------------------

/**
 * Checks if the <html> element's classList contains the specified flag. It
 * returns a `string` with the full flag's class (including value) when
 * found, or `false` when not found.
 *
 * @param {string} $flag
 * @return {boolean|string}
 */
function classListContains($flag) {
    var $classList = TARGET.classList;
    var $result = false;

    // check if the flag without a value is in the classList
    if ($classList.contains($flag)) {
        $result = $flag;
    }
    // when none found, loop through all classes and check if the flag exists
    // with an appended value (eg. .flag--value)
    else {
            // value seperator
            $flag += '--';

            var $i = 0;
            var $classListLength = $classList.length;
            var $flagLength = $flag.length;
            var $class = undefined;

            for (; $i < $classListLength; $i++) {
                $class = $classList[$i];

                if ($class.indexOf('--') > 0 && $class.substring(0, $flagLength) == $flag) {
                    $result = $class;
                    break;
                }
            }
        }

    return $result;
}

//------------------------------------------------------------------------------

/**
 * Checks if the <html> element's classList contains the specified flag. It
 * returns a `string` with the full flag's class (including value) when
 * found, or `false` when not found.
 *
 * @param {string} $flag
 * @return {boolean|string}
 */
var API = function API($flag) {
    return classListContains($flag);
};

/**
 * Set a global class flag to the document <html> root element.
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
    var $isSet = classListContains($flag);

    // when we have a valid, non empty value, append it
    // to flag so we get a class like .flag--value
    if (!!$value) {
        $flag += '--' + $value;
    }

    // als we de huidige gesette flagValue terug krijgen,
    // deze verwijderen
    if ($isSet !== false && $flag != $isSet) {
        TARGET.classList.remove($isSet);
        $isSet = false;
    }

    // when not already set, add the new flag to the list
    if (!$isSet) {
        TARGET.classList.add($flag);
        $result = true;
    }

    return $result;
};

/**
 * Remove a global class flag from the document <html> root element.
 *
 * @param {string} $flag
 * @return {boolean}
 */
API.unset = function ($flag) {
    var $result = false;
    var $isSet = classListContains($flag);

    if ($isSet !== false && $flag != $isSet) {
        TARGET.classList.remove($isSet);
        $result = true;
    }
    return $result;
};

/**
 * Toggle a global class flag on the document <html> root element. Set it when
 * it's not already set. Remove it when it is.
 *
 * @param {string} $flag
 * @return {boolean}
 */
API.toggle = function ($flag) {
    var $result = false;
    var $isSet = classListContains($flag);

    if ($isSet !== false) {
        TARGET.classList.remove($isSet);
    } else {
        TARGET.classList.add($flag);
        $result = true;
    }

    return $result;
};

module.exports = API;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * A reference to the <html> element in the document root.
 * @type {HTMLElement}
 */
var TARGET = document.documentElement;

//------------------------------------------------------------------------------

function newRegExp($flag) {
    return new RegExp('(?:^|\s)' + $flag + '(?!\S)', 'g');
}

//------------------------------------------------------------------------------

/**
 * Checks if the <html> element's class attribute contains the specified flag.
 * It returns a `string` with the full flag's class (including value) when
 * found, or `false` when not found.
 *
 * @param {string} $flag
 * @return {boolean|string}
 */
var API = function API($flag) {
    return newRegExp($flag).test(TARGET.className);
};

API.set = function ($flag) {
    var $value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var $boolean = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    var $result = !newRegExp($flag).test(TARGET.className);
    if ($result) {
        TARGET.className += ' ' + $flag;
    }
    return $result;
};

API.unset = function ($flag) {
    var $result = newRegExp($flag).test(TARGET.className);
    if ($result) {
        TARGET.className = TARGET.className.replace($regExp, '');
    }
    return $result;
};

API.toggle = function ($flag) {
    var $regExp = newRegExp($flag);
    var $result = !$regExp.test(TARGET.className);

    if ($result) {
        TARGET.className += ' ' + $flag;
    } else {
        TARGET.className = TARGET.className.replace($regExp, '');
    }
    return $result;
};

module.exports = API;

},{}]},{},[1])(1)
});