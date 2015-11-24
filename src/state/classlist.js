/**
 * aide | src/state/classlist.js
 */
'use strict';

module.exports =
{
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
    search: function classListSearch($target, $flag, $seperator)
    {
        let $classList = $target.classList;
        let $result    = false;

        // check if the flag without a value is in the classList
        if ($classList.contains($flag))
        {
            $result = $flag;
        }
        // when none found, loop through all classes and check if the flag
        // exists with an appended value (eg. .flag--value)
        else
        {
            // value seperator
            $flag += $seperator;

            let $i               = 0;
            let $classListLength = $classList.length;
            let $flagLength      = $flag.length;
            let $class;

            for (; $i < $classListLength; $i++)
            {
                $class = $classList[$i];

                if ($class.indexOf($seperator) &&
                    $class.substring(0, $flagLength) == $flag)
                {
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
    add: function classListAdd($target, $className)
    {
        $target.classList.add($className);
    },

    /**
     * Remove the class from the target's classList.
     *
     * @param {HTMLElement} $target
     * @param {string} $className
     */
    remove: function classListRemove($target, $className)
    {
        $target.classList.remove($className);
    }
};
