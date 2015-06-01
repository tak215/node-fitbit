"use strict";

/**
 * Query Service is responsible for creating appropriate API query
 **/

var APIModel        = require('./../models/api-model');

var QueryService    = {};

var config          = require('./../config');

var colors          = require('colors');

QueryService.create = _create;

module.exports = QueryService;


/**
 * Create something
 * @param what
 * @param obj
 * @private
 */
function _create(value){

    if(!value.method) throw "Method is not specified.";
    if(!value.format) { value.format = 'json'; }

    var fn = '_create__' + value.method + 'Query'; // _create__GETQuery, _create__POSTQuery, _creaet__DELETEQuery

    switch(value.method){
        case "GET":
        case "POST":
        case "DELETE":
            fn = _create__query;
            break;
        /**
        case "GET":
            fn = _create__GETQuery;
            break;
        case "POST":
            fn = _create__POSTQuery;
            break;
        case "DELETE":
            fn = _create__DELETEQuery;
            break;
         **/
        default:
            throw "Invalid Create method type";
    }

    return fn(value);

}

function _create__query(value){
    if(typeof value !== 'object'){
        throw "Get query must be an object";
    }

    // user Resource URL
    var query = config.userResourceURL;

    // add user id if it's specified
    query += ( value.userId ? value.userId : '-' ) + '/';

    for(var i = 0; i < APIModel.length; i++){

        for(var key in APIModel[i]){

            if(key === _camelCase(value.alias)){
                var dict = APIModel[i][key][value.method];
                if(!dict) throw "That method, "+value.method+" does not exist for " + value.alias; // that method does not exist

                query += dict.url;

                // if date is listed, then add that to the parameter
                if(dict.dateRequired === true && !value.date){
                    throw "Date is not set!";
                } else if(value.date) {
                    query +=  value.date;
                }

                // if timespan is required
                if(dict.timespanRequired === true && !value.timespan){
                    throw "Timespan is not set";
                } else if(value.timespan) {
                    query += '/' + value.timespan;
                }

                // if it's a delete query, append ID parameter (required for all ID)
                if(value.method === 'DELETE'){
                    if(value.data === undefined || value.data.id === undefined) throw "Delete ID cannot be undefined";

                    query += value.data.id;
                }

                // append format type (json, xml)
                query += '.' + value.format.toLowerCase();

                // POST queries need to add parameters after extension with ?
                if(dict.dataParams){
                    console.log('data params is required');
                    query += '?';
                    var params = value.data;
                    if(!params){
                        console.log(colors.yellow("WARNING - Parameters are not set"));
                    }
                    for(var key in params){
                        query += key + '=' + params[key] + '&';
                    }

                    query = query.substring(0,query.length - 1);
                }

                break;
            }
        }
    }
    return query;
}

/**
 * Change into camel case
 * @param str
 * @returns {XML|string|void}
 * @private
 */
function _camelCase(str){
    return str.replace(/[-_][\D]/g, function(match){
        return match.charAt(1) ? match.charAt(1).toUpperCase() : '';
    });
}

/**
 * Create Query
 * @param obj
 * @returns {*}
 * @private
 */
function _create__GETQuery(value){

    if(typeof value !== 'object'){
        throw "Get query must be an object";
    }

    // user Resource URL
    var query = config.userResourceURL;

    // add user id if it's specified
    query += ( value.userId ? value.userId : '-' ) + '/';

    for(var i = 0; i < APIModel.length; i++){
        console.log('APIModel[i]',APIModel[i]);
        for(var key in APIModel[i]){
            if(key === value.alias){
                var dict = APIModel[i][key]['GET'];
                query += dict.url;
                if(dict.dateRequired === true && !value.date){
                    throw "Date is not set!";
                } else if(value.date) {
                    query += '/' + value.date;
                }

                if(dict.timespanRequired === true && !value.timespan){
                    throw "Timespan is not set";
                } else if(value.timespan) {
                    query += '/' + value.timespan;
                }

                query += '.' + value.format.toLowerCase();
            }
            break;
        }
    }
    /**
    for(var i = 0; i < APIModel.length; i++){
        if(APIModel[i].alias === value.alias){
            var dict = APIModel[i];
            // Base API URL
            query = config.userResourceURL;
            // User Name Param
            query += (value.userId ? value.userId : '-') + '/';

            query += dict.url;
            if(dict.date === true){
                if(!value.date){
                    throw "Date is not set"; // TODO this should be today's date
                }
                query += '/' + value.date;
                if(dict.timespan === true){
                    if(!value.timespan){
                        throw "Timespan must be set"; // TODO figure out what's the best timespan default value
                    }
                    query += '/' + value.timespan;
                }
            }
            query += '.' + value.format.toLowerCase();
            break;
        }
    }**/

    return query;
}

// TODO
function _create__POSTQuery(value){

}

function _create__DELETEQuery(value){

}




/**
 switch(alias){
        case "user":
            //https://api.fitbit.com/1/user/-/profile.json
            query = 'profile.json';
            break;

        case "measurements":
            //https://api.fitbit.com/1/user/-/body/date/2015-03-01.json
            query = 'body/date/2015';
            break;

        case "weight":
            //https://api.fitbit.com/1/user/-/body/log/weight/date/2015-03-01.json

            break;

        case "fat":
            //https://api.fitbit.com/1/user/-/body/log/fat/date/2015-03-01.json
            break;

        case "badge":
            //https://api.fitbit.com/1/user/-/badges.json
            break;

        case "series":
            //https://api.fitbit.com/1/user/-/body/weight/date/2015-03-01/7d.json
            break;

        case "weight-goal":
            //https://api.fitbit.com/1/user/-/body/log/weight/goal.json
            break;

        case "fat-goal":
            //https://api.fitbit.com/1/user/-/body/log/fat/goal.json
            break;

        case "activities":
            //https://api.fitbit.com/1/user/-/activities/date/2015-03-01.json
            break;

        case "acivity-stats":
            //https://api.fitbit.com/1/user/-/activities.json
            break;

        case "time-series":
            //https://api.fitbit.com/1/user/-/activities/calories/date/2015-03-01/7d.json
            break;

        case "recent-activity":
            //https://api.fitbit.com/1/user/-/activities/recent.json
            break;

        case "frequent-activity":
            //https://api.fitbit.com/1/user/-/activities/frequent.json
            break;

        case "favorite-activity":
            //https://api.fitbit.com/1/user/-/activities/favorite.json
            break;

        case "activity-daily-goal":
            //https://api.fitbit.com/1/user/-/activities/goals/daily.json
            break;

        case "activity-weekly-goal":
            //https://api.fitbit.com/1/user/-/activities/goals/weekly.json
            break;

        default:
            throw "Invalid Get Query Alias";
    }**/
