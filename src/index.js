"use strict";


/**
 * Fitbit API Index
 *
 */


    var FitbitAPI = {};

    var ClientWrapper = require('./modules/client-wrapper');

    FitbitAPI.setKeys           = ClientWrapper.setKeys;

    FitbitAPI.query             = ClientWrapper.query;

    FitbitAPI.getAccessToken    = ClientWrapper.getAccessToken;

    FitbitAPI.getRequestToken   = ClientWrapper.getRequestToken;


/** Handle rejection error */
process.on('unhandledRejection', function(err){
    console.log(err.toString());
});

module.exports = FitbitAPI;

