'use strict';

/**
 * Creates a new RegExp object wich matches the given flag.
 *
 * @param {string} $flag
 * @return {RegExp}
 */
function newRegExp($flag)
{
    return new RegExp('(?:^|\\s)'+ $flag +'(?!\\S)', 'g');
}

/**
 * Escapes the seperator. Function taken from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *
 * @param {string} $str
 * @return {string}
 */
function escapeRegExp($str)
{
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
    search: function regExpSearch($target, $flag, $seperator='--')
    {
        $seperator = escapeRegExp($seperator);

        let $result = false;
        let $found  = $target.className.match($flag + $seperator + '.*');

        if ($found)
        {
            $result = $found[0].split(' ')[0];
        }
        else if (newRegExp($flag).test($target.className))
        {
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
    add: function regExpAdd($target, $className)
    {
        $target.className += ' '+ $className;
    },

    /**
     * Remove the class from the target's class attribute.
     *
     * @param {HTMLElement} $target
     * @param {string} $className
     */
    remove: function regExpRemove($target, $className)
    {
        let $regExp = newRegExp($className);
        $target.className = $target.className.replace($regExp, '');
    }
};
