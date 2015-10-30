/*!
 *  core.events
 *  Copyright (c) 2014 Roel Schut (http://roelschut.nl)
 *
 *  Version: 1.0.004
 */
var core = core || {};
(function(core, window)
{
    'use strict';

    var _eventHandles = {};

/************************************************************************************************************************************************/

    var Broadcaster = function()
    {
        this.eventHandles = {};

        for(var $i = 0, $iL = arguments.length; $i < $iL; $i++)
        {
            this.eventHandles[arguments[$i]] = [];
        }

        if(!$iL && console && console.warn)
        {
            console.warn('Broadcaster: no event handles set!');
        }
    };

    Broadcaster.prototype =
    {
        add: function($eventType, $eventHandle)
        {
            if(this.eventHandles[$eventType])
            {
                this.eventHandles[$eventType].push($eventHandle);
            }
        },

        trigger: function($eventType, $args)
        {
            var $eventHandles = this.eventHandles[$eventType],
                $eventHandle,
                $i = 0,
                $iL;

            if($eventHandles)
            {
                if(!Array.isArray($args)) $args = [];

                for($iL = $eventHandles.length; $i < $iL; $i++)
                {
                    $eventHandle = $eventHandles[$i];
                    $eventHandle.apply(window, $args);
                }
            }
        }
    };

/************************************************************************************************************************************************/

    core.events =
    {
        VERSION: '1.0.003',

        Broadcaster: Broadcaster,

        // voor native js events
        add: function($element, $eventType, $evenHandle)
        {
            var $return = false;
            if($element && $element !== null && typeof($element) != 'undefined')
            {
                if($element.addEventListener)
                {
                    $element.addEventListener($eventType, $evenHandle, false);
                }
                else
                {
                    $eventType = 'on'+ $eventType;
                    if($element.attachEvent)
                    {
                        $element.attachEvent($eventType, $evenHandle);
                    }
                    else
                    {
                        if(typeof($element[$eventType]) == 'function')
                        {
                            var $originalEventHandle = $element[$eventType];
                            $element[$eventType] = function($e)
                            {
                                $originalEventHandle($e);
                                $evenHandle($e);
                            };
                        }
                        else
                        {
                            $element[$eventType] = $evenHandle;
                        }
                    }
                }
            }

            return $return;
        },

        // voor native js events
        remove: function($element, $eventType, $evenHandle)
        {
            var $return = false;
            if($element && $element !== null && typeof($element) != 'undefined')
            {
                if($element.removeEventListener)
                {
                    $element.removeEventListener($eventType, $evenHandle, false);
                }
                else
                {
                    $eventType = 'on'+ $eventType;
                    if($element.detachEvent)
                    {
                        $element.detachEvent($eventType, $evenHandle);
                    }
                    else
                    {
                        $element[$eventType] = null;
                    }
                }
            }

            return $return;
        }
    };

})(core, window);
