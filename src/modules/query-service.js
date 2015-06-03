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

    var fn;

    switch(value.method){
        case "GET":
        case "POST":
        case "DELETE":
            fn = _create__query;
            break;
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


        for(var key in APIModel){

            if(key === _camelCase(value.alias)){
                var dict = APIModel[key][value.method];
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
