/**
 * aide | src/event/utils.js
 */
'use strict';

const UtilsStandard = require('./utils/standard');
const UtilsLegacy   = require('./utils/legacy');

/**
 * The current used plugin to add/remove and search for classes in the target.
 * @type {string}
 */
const Utils = (!document.addEventListener ? UtilsLegacy : UtilsStandard);

// -----------------------------------------------------------------------------

// expose both standard and legacy versions of adding/removing events so they
// can be tested seperatly
Utils._standard = UtilsStandard;
Utils._legacy   = UtilsLegacy;

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = Utils;
