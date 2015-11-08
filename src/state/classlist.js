'use strict';

/**
 * Checks if the <html> element's classList contains the specified flag. It
 * returns `true` when:
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
 * Searches the target's classList for the specified flag with optional value.
 * It returns a `string` with the full flag's class (including value) when
 * found, or `false` when not found.
 *
 * @param {string} $flag
 * @return {boolean|string}
 */
API.search = function($flag)
{
    let $classList = API.TARGET.classList;
    let $result    = false;

    // check if the flag without a value is in the classList
    if ($classList.contains($flag))
    {
        $result = $flag;
    }
    // when none found, loop through all classes and check if the flag exists
    // with an appended value (eg. .flag--value)
    else
    {
        // value seperator
        $flag += API.SEPERATOR;

        let $i               = 0;
        let $classListLength = $classList.length;
        let $flagLength      = $flag.length;
        let $class;

        for (; $i < $classListLength; $i++)
        {
            $class = $classList[$i];

            if ($class.indexOf(API.SEPERATOR) &&
                $class.substring(0, $flagLength) == $flag)
            {
                $result = $class;
                break;
            }
        }
    }

    return $result;
};

/**
 * Set a global state class flag to the target element. The default target is
 * the document <html> root element.
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
    let $isSet  = API.search($flag);

    // when we have a valid, non empty value, append it
    // to flag so we get a class like .flag--value
    if (!!$value)
    {
        $flag += API.SEPERATOR;
    }

    // als we de huidige gesette flagValue terug krijgen,
    // deze verwijderen
    if ($isSet !== false && $flag != $isSet)
    {
        API.TARGET.classList.remove($isSet);
        $isSet = false;
    }

    // when not already set, add the new flag to the list
    if (!$isSet)
    {
        API.TARGET.classList.add($flag);
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
    let $isSet  = API.search($flag);

    if ($isSet !== false && $flag != $isSet)
    {
        API.TARGET.classList.remove($isSet);
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
API.toggle = function($flag)
{
    let $result = false;
    let $isSet  = API.search($flag);

    if ($isSet !== false)
    {
        API.TARGET.classList.remove($isSet);
    }
    else
    {
        API.TARGET.classList.add($flag);
        $result = true;
    }

    return $result;
};

module.exports = API;
