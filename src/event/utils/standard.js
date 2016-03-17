/**
 * aide | src/events/utils/standard.js
 */
module.exports =
{
    addListener: function($target, $type, $listener, $useCapture)
    {
        // convert arguments to an array and remove the first value
        let $args = Array.apply(null, arguments).slice(1);
        return $target.addEventListener.apply($target, $args);
    },

    removeListener: function($target, $type, $listener, $useCapture)
    {
        // convert arguments to an array and remove the first value
        let $args = Array.apply(null, arguments).slice(1);
        return $target.removeEventListener.apply($target, $args);
    },

    /**
     * Creates a CustomEvent object
     *
     * @param {string} $type - The type of event to create
     * @param {boolean} $bubbles [false]
     * @param {boolean} $cancelable [false]
     * @param {object} $detail [null]
     * @return {object}
     */
    createEvent: function($type,
                          $bubbles = false,
                          $cancelable = false,
                          $detail = null)
    {
        return new CustomEvent($type,
        {
            'bubbles':    $bubbles,
            'cancelable': $cancelable,
            'detail':     $detail
        });
    }
};
