/**
 * aide | src/events/utils/legacy.js
 */
module.exports =
{
    addListener: function($target, $type, $listener)
    {
        $type = 'on'+ $type;

        if ($target.attachEvent)
        {
            return $target.attachEvent($type, $listener);
        }
        else
        {
            if (typeof($target[$type]) === 'function')
            {
                let $previousListener = $target[$type];
                $target[$type] = function($e)
                {
                    $previousListener($e);
                    $listener($e);
                };
            }
            else
            {
                $target[$type] = $listener;
            }

            return true;
        }
    },

    removeListener: function($target, $type, $listener)
    {
        $type = 'on'+ $type;
        if ($target.detachEvent)
        {
            return $target.detachEvent($type, $listener);
        }
        else
        {
            $target[$type] = null;
            return true;
        }
    },

    /**
     * Creates a CustomEvent object
     * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
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
        let $result = document.createEvent('CustomEvent');
        $result.initCustomEvent($type, $bubbles, $cancelable, $detail);

        return $result
    }
};
