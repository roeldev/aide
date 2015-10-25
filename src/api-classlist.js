'use strict';

/**
 * A reference to the <html> element in the document root.
 * @type {HTMLElement}
 */
const TARGET = document.documentElement;

//------------------------------------------------------------------------------

/**
 * Checks if the <html> element's classList contains the specified flag. It
 * returns a `string` with the full flag's class (including value) when
 * found, or `false` when not found.
 *
 * @param {string} $flag
 * @return {boolean|string}
 */
function classListContains($flag)
{
    let $classlist = TARGET.classList;
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
        $flag += '--';

        let $i               = 0;
        let $classListLength = $classList.length;
        let $flagLength      = $flag.length;
        let $class;

        for (; $i < $classListLength; $i++)
        {
            $class = $classList[$i];

            if ($class.indexOf('--') > 0 &&
                $class.substring(0, $flagLength) == $flag)
            {
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
var API = function($flag)
{
    return classListContains($flag);
};

/**
 * Set a global class flag to the document <html> root element.
 *
 * @param {string} $flag
 * @param {string} $value
 * @param {boolean} $boolean
 * @return {boolean}
 */
API.set = function($flag, $value='', $boolean=true)
{
    // it is possible to conditionally set or unset a flag/value. when the
    // $boolean param is false, unset the (already added) flag.
    if ($boolean === false)
    {
        return API.unset($flag);
    }

    let $result = false;
    let $isSet  = classListContains($flag);

    // when we have a valid, non empty value, append it
    // to flag so we get a class like .flag--value
    if (!!$value)
    {
        $flag += '--'+ $value;
    }

    // als we de huidige gesette flagValue terug krijgen,
    // deze verwijderen
    if ($isSet !== false && $flag != $isSet)
    {
        TARGET.classList.remove($isSet);
        $isSet = false;
    }

    // when not already set, add the new flag to the list
    if (!$isSet)
    {
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
API.unset = function($flag)
{
    let $result = false;
    let $isSet  = classListContains($flag);

    if ($isSet !== false && $flag != $isSet)
    {
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
API.toggle = function($flag)
{
    let $result = false;
    let $isSet  = classListContains($flag);

    if ($isSet !== false)
    {
        TARGET.classList.remove($isSet);
    }
    else
    {
        TARGET.classList.add($flag);
        $result = true;
    }

    return $result;
};

export default API;
