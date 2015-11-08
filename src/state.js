'use strict';

var API = (document.documentElement.classList ?
           require('./state/classlist.js') :
           require('./state/regexp.js'));

/**
 * A reference to the <html> element in the document root.
 * @type {HTMLElement}
 */
API.TARGET = document.documentElement;

/**
 * The seperator sequence between a flag and a value (eg. flag--value).
 * @type {string}
 */
API.SEPERATOR = '--';

// -----------------------------------------------------------------------------

module.exports = API;
