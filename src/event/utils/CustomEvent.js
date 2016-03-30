/**
 * aide | src/event/utils/CustomEvent.js
 *
 * - tests
 */

const win = window;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

// Polyfill example taken from
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
const CustomEventPolyfill = function CustomEventPolyfill($type, $options)
{
    let $result = document.createEvent('CustomEvent');
    $result.initCustomEvent($type,
                            $options.bubbles,
                            $options.cancelable,
                            $options.detail);

    return $result;
};

CustomEventPolyfill.prototype = win.Event.prototype;

// -----------------------------------------------------------------------------

module.exports = ((typeof win.CustomEvent !== 'function') ?
                    CustomEventPolyfill :
                    win.CustomEvent);
