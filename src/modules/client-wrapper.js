"use strict";



/**
 * Fitbit API Index
 *
 */

var async           = require('async');

var config          = require('./config');

var TokenService    = require('./modules/token-service');

var FitbitClient    = require('./modules/client');

var TokenModel      = require('./models/token');

var Tokens          = [];

var extend          = require('util')._extend;

var ClientWrapper       = {};

ClientWrapper.getRequestToken   = _getRequestToken;

ClientWrapper.getAccessToken    = _getAccessToken;

ClientWrapper.get               = _get;

ClientWrapper.set               = _set;

ClientWrapper.delete            = _delete;

/**
 * Get Request Token
 * @returns {Promise}
 * @private
 */

function _getRequestToken(){
    return new Promise(function(resolve, reject){

        FitbitClient
            .getRequestToken(config.CONSUMER_KEY, config.CONSUMER_SECRET)
            .then(function(results){

                var token = new TokenModel({
                    requestToken: results[0],
                    requestTokenSecret: results[1]
                });

                var resultTokenObj = TokenService.add(token, Tokens);

                resolve( resultTokenObj );
            });

    })
}

/**
 * Verify Request Token and Get Access Token
 * @param requestToken
 * @param requestTokenSecret
 * @param verifier
 * @returns {Promise}
 * @private
 */

function _getAccessToken(token, secret, verifier){
    var tokenObj = TokenService.find('requestToken', token);

    return new Promise(function(resolve, reject){

        FitbitClient
            .getAccessToken(token, secret, verifier)
            .then(function(accessTokenData){

                tokenObj = extend(tokenObj, {
                    accessToken: accessTokenData[0],
                    accessTokenSecret: accessTokenData[1],
                    userId: accessTokenData[2].encoded_user_id
                });

                resolve( tokenObj );
            });

    });
}


function _delete(what, accessToken, accessTokenSecret, userId){
    return _execute(what, 'DELETE', accessToken, accessTokenSecret, userId);
}

function _set(what, accessToken, accessTokenSecret, userId){
    return _execute(what, 'UPDATE',accessToken, accessTokenSecret, userId);
}

function _get(what, accessToken, accessTokenSecret, userId){
    return  _execute(what, 'GET',accessToken, accessTokenSecret, userId);
}

/**
 * Array of objects
 * @param what : array of objects
 * Note : Each object should look like this
 *
 * var obj = {
 *      alias: 'user',
 *      param: 'calories',
 *      date: '2015-05-30',
 *      interval: '7d'
 * };
 *
 * @param userId
 * @private
 */
function _execute(what, method, accessToken, accessTokenSecret, userId){

    return new Promise(function(resolve, reject){

        var asyncStack = [];

        if(typeof what === 'string'){
            what = [what];
        }

        what.forEach(function(item){

            var query = TokenService.create(method + '-query', item.alias);

            asyncStack.push(_asyncRequestResourceClosure(query, method, accessToken, accessTokenSecret, uesrId));

        });

        async.parallel(asyncStack,
            function(err, results){
                var obj  = {};
                what.forEach(function(item, index){
                    obj[item.alias] = results[index];
                })
                resolve( obj );
        });

    });
}

/**
 * Asynchnorous closure appropriate for async.parallel
 * @param path
 * @param method
 * @param accessToken
 * @param accessTokenSecret
 * @param userId
 * @returns {Function}
 * @private
 */
function _asyncRequestResourceClosure(path, method, accessToken, accessTokenSecret, userId){
    return function(cb){
        FitbitClient
            .requestResource(path, method, accessToken, accessTokenSecret, userId)
            .then(function(data){
                cb(null, data);
            })
    }
}




module.exports = FitbitAPI;