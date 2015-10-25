'use strict';

/**
 * A reference to the <html> element in the document root.
 * @type {HTMLElement}
 */
const TARGET = document.documentElement;

//------------------------------------------------------------------------------

function newRegExp($flag)
{
    return new RegExp('(?:^|\s)'+ $flag +'(?!\S)', 'g');
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
var API = function($flag)
{
    return newRegExp($flag).test(TARGET.className);
};

API.set = function($flag, $value='', $boolean=true)
{
    let $result = !newRegExp($flag).test(TARGET.className);
    if ($result)
    {
        TARGET.className += ' '+ $flag;
    }
    return $result;
};

API.unset = function($flag)
{
    let $result = newRegExp($flag).test(TARGET.className);
    if ($result)
    {
        TARGET.className = TARGET.className.replace($regExp, '');
    }
    return $result;
};

API.toggle = function($flag)
{
    let $regExp = newRegExp($flag);
    let $result = !$regExp.test(TARGET.className);

    if ($result)
    {
        TARGET.className += ' '+ $flag;
    }
    else
    {
        TARGET.className = TARGET.className.replace($regExp, '');
    }
    return $result;
};

export default API;
