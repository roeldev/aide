/*!
 *  core.window.onScroll
 *  Copyright (c) 2014 Roel Schut (http://roelschut.nl)
 *
 *  Version: 1.0.010
 *  Requires: core.events
 */
var core = core || {};
(function(core, window, document)
{
    'use strict';
    if(!core.window) core.window = {};

    var DIRECTION_UP    = 'up',
        DIRECTION_DOWN  = 'down',
        DIRECTION_LEFT  = 'left',
        DIRECTION_RIGHT = 'right',
        FLAG_SCROLLING  = 'window-scrolling',

        EVENT_SCROLL        = 'scroll',
        EVENT_SCROLL_START  = 'scroll.start',
        EVENT_SCROLL_STOP   = 'scroll.stop',

        _elHtml = document.documentElement,
        _elBody = document.getElementsByTagName('body')[0],

        _broadcaster = new core.events.Broadcaster(EVENT_SCROLL, EVENT_SCROLL_START, EVENT_SCROLL_STOP),
        _timeout;

/**********************************************************************************************************************/

    var ScrollOffset = function($top, $left)
    {
        this.top    = $top;
        this.bottom = (core.window.scrollHeight - $top);

        this.left   = $left;
        this.right  = (core.window.scrollWidth - $left);
    };

    ScrollOffset.prototype =
    {
        difference: function($offset)
        {
            return {
                x: (this.left - $offset.left),
                y: (this.top - $offset.top)
            };
        }
    };

/**********************************************************************************************************************/

    core.window.scrollFlags          = true;
    core.window.scrollTimeout        = 200;
    core.window.scrolling            = false;
    core.window.scrollWidth          = 0;
    core.window.scrollHeight         = 0;
    core.window.scrollOffset         = false;
    core.window.scrollPreviousOffset = false;
    core.window.scrollStartOffset    = false;
    core.window.scrollStopOffset     = false;
    core.window.scrollDirectionX     = '';
    core.window.scrollDirectionY     = '';

    core.window.onScroll = function($eventType, $eventHandle)
    {
        if(arguments.length == 1)
        {
            _broadcaster.add(EVENT_SCROLL, arguments[0]);
        }
        else
        {
            if($eventType != EVENT_SCROLL) $eventType = EVENT_SCROLL +'.'+ $eventType;
            _broadcaster.add($eventType, $eventHandle);
        }
    };

    core.window.onScroll.VERSION = '1.0.010';

/**********************************************************************************************************************/

    /**
     *  Update scroll offset informatie.
     */
    function _update()
    {
        core.window.scrollWidth  = _elHtml.scrollLeftMax;
        core.window.scrollHeight = _elHtml.scrollTopMax;

        core.window.scrollPreviousOffset = core.window.scrollOffset;
        core.window.scrollOffset = new ScrollOffset(_elHtml.scrollTop, _elHtml.scrollLeft);

        if(core.window.scrollPreviousOffset)
        {
            var $difference = core.window.scrollOffset.difference(core.window.scrollPreviousOffset);

            // horizontale scroll richting
            if($difference.x === 0)
            {
                core.window.scrollDirectionX = '';
            }
            else
            {
                core.window.scrollDirectionX = (($difference.x > 0) ? DIRECTION_RIGHT : DIRECTION_LEFT);
            }

            // verticale scroll richting
            if($difference.y === 0)
            {
                core.window.scrollDirectionY = '';
            }
            else
            {
                core.window.scrollDirectionY = (($difference.y > 0) ? DIRECTION_DOWN : DIRECTION_UP);
            }
        }
    }

    /**
     *  Wordt uitgevoerd wanneer de timeout na het scrollen is bereikt en
     *  zorgt ervoor dat de scrollstop events uitgevoegd kunnen worden.
     */
    function _scrollStop()
    {
        clearTimeout(_timeout);
        _timeout = false;

        if(core.window.scrollFlags && core.flag)
        {
            core.flag.unset(FLAG_SCROLLING);
        }

        core.window.scrolling = false;
        core.window.scrollStopOffset = core.window.scrollOffset;

        _broadcaster.trigger(EVENT_SCROLL_STOP);
    }

    // voor het eerst scroll offset updaten
    _update();

    // Zodra het venster wordt verkleind wordt deze function aangeroepen.
    // Deze triggert de scrollstart en scroll events.
    core.events.add(window, 'scroll', function($e)
    {
        if(!core.window.scrolling)
        {
            // wanneer core.flag ingeladen
            if(core.window.scrollFlags && core.flag)
            {
                core.flag.set(FLAG_SCROLLING);
            }

            core.window.scrolling = true;
            core.window.scrollStartOffset = core.window.scrollOffset;
            core.window.scrollStopOffset = null;

            _broadcaster.trigger(EVENT_SCROLL_START, [$e]);
        }

        _update();
        _broadcaster.trigger(EVENT_SCROLL, [$e]);

        clearTimeout(_timeout);
        _timeout = setTimeout(_scrollStop, core.window.scrollTimeout);
    });

})(core, window, document);
