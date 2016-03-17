/**
 * aide | src/state.js
 */
'use strict';

const UtilsClassList = require('./state/classlist');
const UtilsRegExp    = require('./state/regexp');

/**
 * The current used plugin to add/remove and search for classes in the target.
 * @type {string}
 */
const Utils = (document.documentElement.classList ?
               UtilsClassList :
               UtilsRegExp);

// // // // // // // // // // // // // // // // // // // // // // // // // // //

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
const AideState = function($flag, $value=true)
{
    let $found = AideState.search($flag);

    // result is positive when:
    // - flag is set and $value = true
    // - flag is not set and $value = false
    let $result = (($flag === $found && $value === true) ||
                   (!$found && $value === false));

    // when negative result, but with positive search, check if the value (when
    // not true) appended to the flag (with the seperator) equals the found
    // class, otherwise return the found value of the flag
    if (!$result && $found)
    {
        let $prefix = $flag + AideState.SEPERATOR;

        $result = (($value === true) ?
                   $found.substring($prefix.length) :
                   ($found === $prefix + $value));
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
AideState.search = function($flag)
{
    return Utils.search(AideState.TARGET, $flag, AideState.SEPERATOR);
};

/**
 * Set a global state class flag to the target element.
 *
 * @param {string} $flag
 * @param {string} $value ['']
 * @param {boolean} $bool [true]
 * @return {boolean}
 */
AideState.set = function($flag, $value='', $bool=true)
{
    // it is possible to conditionally set or unset a flag/value. when the
    // $bool param is false, unset the (already added) flag.
    if ($bool === false)
    {
        return AideState.unset($flag);
    }

    let $result = false;
    let $found  = AideState.search($flag);

    // when we have a valid, non empty value, append it
    // to flag so we get a class like .flag--value
    if (!!$value)
    {
        $flag += AideState.SEPERATOR + $value;
    }

    // if we've found the currently set flagValue, remove it
    if ($found !== false && $flag != $found)
    {
        Utils.remove(AideState.TARGET, $found);
        $found = false;
    }

    // when not already set, add the new flag to the list
    if (!$found)
    {
        Utils.add(AideState.TARGET, $flag);
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
AideState.unset = function($flag)
{
    let $result = false;
    let $found  = AideState.search($flag);

    if ($found !== false)
    {
        Utils.remove(AideState.TARGET, $found);
        $result = true;
    }
    return $result;
};

/**
 * Toggle a state class flag on the target element. Set it when it's not
 * already set. Remove it when it is.
 *
 * @param {string} $flag
 * @param {string} $value ['']
 * @return {boolean}
 */
AideState.toggle = function($flag, $value='')
{
    let $result = false;
    let $found  = AideState.search($flag);

    if ($found !== false)
    {
        Utils.remove(AideState.TARGET, $found);
    }
    else
    {
        AideState.set($flag, $value);
        $result = true;
    }

    return $result;
};

/**
 * A reference to the <html> element in the document root.
 * @type {HTMLElement}
 */
AideState.TARGET = document.documentElement;

/**
 * The seperator sequence between a flag and a value (eg. flag--value).
 * @type {string}
 */
AideState.SEPERATOR = '--';

// -----------------------------------------------------------------------------

// expose both versions of adding/removing/searching for classes so they can be
// tested seperatly
AideState._classList = UtilsClassList;
AideState._regExp    = UtilsRegExp;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = AideState;
