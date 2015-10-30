/*!
 *  core.window.onResize
 *  Copyright (c) 2014 Roel Schut (http://roelschut.nl)
 *
 *  Version: 1.0.011
 *  Requires: core.events
 */
var core = core || {};
(function(core, window, document)
{
    'use strict';
    if(!core.window) core.window = {};

    var ORIENTATION_PORTRAIT  = 'portrait',
        ORIENTATION_LANDSCAPE = 'landscape',
        FLAG_RESIZING         = 'window-resizing',

        EVENT_RESIZE        = 'resize',
        EVENT_RESIZE_START  = 'resize.start',
        EVENT_RESIZE_STOP   = 'resize.stop',

        _elHtml = document.documentElement,
        _elBody = document.getElementsByTagName('body')[0],

        _broadcaster = new core.events.Broadcaster(EVENT_RESIZE, EVENT_RESIZE_START, EVENT_RESIZE_STOP),
        _timeout,
        _orientation;

/**********************************************************************************************************************/

    core.window.resizeFlags       = true;
    core.window.resizeTimeout     = 200;
    core.window.resizing          = false;
    core.window.width             = 0;
    core.window.height            = 0;
    core.window.sizeRatio         = 0;
    core.window.screenOrientation = '';

    core.window.onResize = function($eventType, $eventHandle)
    {
        if(arguments.length == 1)
        {
            _broadcaster.add(EVENT_RESIZE, arguments[0]);
        }
        else
        {
            if($eventType != EVENT_RESIZE) $eventType = EVENT_RESIZE +'.'+ $eventType;
            _broadcaster.add($eventType, $eventHandle);
        }
    };

    core.window.onResize.VERSION = '1.0.011';

/**********************************************************************************************************************/

    /**
     *  Update grootte van het venster, breedte/hoogte verhouding en scherm oriÃ«ntatie.
     */
    function _update()
    {
        core.window.width     = window.innerWidth || _elHtml.clientWidth || _elBody.clientWidth;
        core.window.height    = window.innerHeight || _elHtml.clientHeight|| _elBody.clientHeight;
        core.window.sizeRatio = (core.window.width / core.window.height);

        core.window.screenOrientation = ((core.window.sizeRatio >= 1) ? ORIENTATION_PORTRAIT : ORIENTATION_LANDSCAPE);
    }

    /**
     *  Wordt uitgevoerd wanneer de timeout na het resizen is bereikt en
     *  zorgt ervoor dat de resizestop events uitgevoegd kunnen worden.
     */
    function _resizeStop()
    {
        clearTimeout(_timeout);
        _timeout = false;

        _update();

        if(core.window.resizeFlags && core.flag)
        {
            core.flag.unset(FLAG_RESIZING);
        }

        core.window.resizing = false;
        _broadcaster.trigger(EVENT_RESIZE_STOP);
    }

    // voor het eerst window grootte updaten
    _update();

    // Zodra het venster wordt verkleind wordt deze function aangeroepen.
    // Deze triggert de resizestart en resize events.
    core.events.add(window, 'resize', function($e)
    {
        if(!core.window.resizing)
        {
            // wanneer core.flag ingeladen
            if(core.window.resizeFlags && core.flag)
            {
                core.flag.set(FLAG_RESIZING);
            }

            core.window.resizing = true;
            _orientation = core.window.screenOrientation;

            _broadcaster.trigger(EVENT_RESIZE_START, [$e]);
        }

        _update();
        _broadcaster.trigger(EVENT_RESIZE, [$e]);

        clearTimeout(_timeout);
        _timeout = setTimeout(_resizeStop, core.window.resizeTimeout);
    });

})(core, window, document);
