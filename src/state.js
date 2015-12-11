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
var API = function($flag, $value=true)
{
    let $found = API.search($flag);

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
        let $prefix = $flag + API.SEPERATOR;

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
API.search = function($flag)
{
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
API.set = function($flag, $value='', $bool=true)
{
    // it is possible to conditionally set or unset a flag/value. when the
    // $bool param is false, unset the (already added) flag.
    if ($bool === false)
    {
        return API.unset($flag);
    }

    let $result = false;
    let $found  = API.search($flag);

    // when we have a valid, non empty value, append it
    // to flag so we get a class like .flag--value
    if (!!$value)
    {
        $flag += API.SEPERATOR + $value;
    }

    // als we de huidige gesette flagValue terug krijgen,
    // deze verwijderen
    if ($found !== false && $flag != $found)
    {
        Utils.remove(API.TARGET, $found);
        //API.TARGET.classList.remove($found);
        $found = false;
    }

    // when not already set, add the new flag to the list
    if (!$found)
    {
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
API.unset = function($flag)
{
    let $result = false;
    let $found  = API.search($flag);

    if ($found !== false)
    {
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
 * @param {string} $value ['']
 * @return {boolean}
 */
API.toggle = function($flag, $value='')
{
    let $result = false;
    let $found  = API.search($flag);

    if ($found !== false)
    {
        Utils.remove(API.TARGET, $found);
    }
    else
    {
        API.set($flag, $value);
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
API._regExp    = UtilsRegExp;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = API;
