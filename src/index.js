"use strict";


/**
 * Fitbit API Index
 *
 */

var ClientWrapper   = require('./modules/client-wrapper.js');

var FitbitAPI       = {};

FitbitAPI.get               = ClientWrapper.get;

FitbitAPI.set               = ClientWrapper.set;

FitbitAPI.delete            = ClientWrapper.delete;

/**
 * Handle rejection error
 */
process.on('unhandledRejection', function(err){
    console.log(err.toString());
});


module.exports = FitbitAPI;