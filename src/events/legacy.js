/**
 * aide | src/events/legacy.js
 */
module.exports =
{
    add: function($element, $type, $listener)
    {
        $type = 'on'+ $type;

        if ($element.attachEvent)
        {
            return $element.attachEvent($type, $listener);
        }
        else
        {
            if (typeof($element[$type]) === 'function')
            {
                var $previousListener = $element[$type];
                $element[$type] = function($e)
                {
                    $previousListener($e);
                    $listener($e);
                };
            }
            else
            {
                $element[$type] = $listener;
            }

            return true;
        }
    },

    remove: function($element, $type, $listener)
    {
        $type = 'on'+ $type;
        if($element.detachEvent)
        {
            return $element.detachEvent($type, $listener);
        }
        else
        {
            $element[$type] = null;
            return true;
        }
    }
};
