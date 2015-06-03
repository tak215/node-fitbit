/**
 * Fitbit API Index
 *
 */


/** Be a little strict and disciplined */
"use strict";


var async           = require('async');

var util            = require('util');

var isArray         = util.isArray;

var extend          = util._extend;

var config          = require('./../config');

var TokenService    = require('./token-service');

var FitbitClient    = require('./client');

var TokenModel      = require('./../models/token');

var Tokens          = [];

var QueryService    = require('./query-service');

var Promise         = require('bluebird');

var ClientWrapper   = {};


ClientWrapper.getRequestToken   = _getRequestToken;

ClientWrapper.getAccessToken    = _getAccessToken;

ClientWrapper.query             = _query;

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

/**
 *
 * @param what
 * @param method
 * @param format
 * @param accessToken
 * @param accessTokenSecret
 * @param userId
 * @private
 */
function _query(what, method, format, accessToken, accessTokenSecret, userId){

    if(/get/i.test(format) === true){
        return  _execute(what, 'GET', format, accessToken, accessTokenSecret, userId);
    }
    else if(/(set|update|post)/i.test(format) === true){
        return  _execute(what, 'POST', format, accessToken, accessTokenSecret, userId);
    }
    else if(/delete/i.test(format) === true ){
        return _execute(what, 'DELETE', accessToken, accessTokenSecret, userId);
    }
    else{
        throw "Invalid Query Format Type";
    }
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
function _execute(what, method, format, accessToken, accessTokenSecret, userId){

    return new Promise(function(resolve, reject){

        var asyncStack = [];

        if(!what){
            return reject("invalid what type");
        }
        if(isArray(what) !== true){
            what = [what];
        }

        what.forEach(function (item) {

            item.format = format;

            item.method = method;

            var query = QueryService.create(item);

            asyncStack.push(_asyncRequestResourceClosure(query, method, accessToken, accessTokenSecret, uesrId));

        });

        async.parallel(asyncStack,
            function(err, results){
                if(err){
                    return reject(err);
                }
                var obj  = {};
                what.forEach(function(item){
                    obj[item.alias] = item;
                });
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
            }, function(reason){
                cb(reason);
            });
    }
}


module.exports = ClientWrapper;