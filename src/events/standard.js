/**
 * aide | src/events/standard.js
 */
module.exports =
{
    add: function($element, $type, $listener, $useCapture)
    {
        return $element.addEventListener($type, $listener, $useCapture);
    },

    remove: function($element, $type, $eventHandle, $useCapture)
    {
        return $element.removeEventListener($type, $listener, $useCapture);
    }
};
