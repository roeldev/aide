/**
 * aide | src/event/utils/eventListener.js
 *
 * - tests
 */

const win = window;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

let _apiAdd;
let _apiRemove;

// -----------------------------------------------------------------------------

if (win.addEventListener)
{
    _apiAdd = function eventAddListener($target, $type, $listener, $useCapture)
    {
        return $target.addEventListener($type, $listener, $useCapture);
    };

    _apiRemove = function eventRemoveListener($target, $type, $listener, $useCapture)
    {
        return $target.removeEventListener($type, $listener, $useCapture);
    };
}
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/attachEvent
else if (win.attachEvent)
{
    _apiAdd = function eventAddListenerIE($target, $type, $listener)
    {
        return $target.attachEvent('on' + $type, $listener);
    };

    _apiRemove = function eventRemoveListenerIE($target, $type, $listener)
    {
        return $target.detachEvent('on' + $type, $listener);
    };
}
else
{
    _apiAdd = function eventAddListenerLegacy($target, $type, $listener)
    {
        $type = 'on'+ $type;
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
    };

    _apiRemove = function eventRemoveListenerLegacy($target, $type, $listener)
    {
        $target[$type] = null;
        return true;
    };
}

// -----------------------------------------------------------------------------

module.exports =
{
    'add':    _apiAdd,
    'remove': _apiRemove
};
