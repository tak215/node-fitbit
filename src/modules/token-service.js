"use strict";


var TokenService = {};

var util            = require('util');

var isArray         = util.isArray;

TokenService.find   = _find;

TokenService.add    = _add;

TokenService.create = _create;

module.exports = TokenService;

/**
 * Find something in array
 * @param byWhat
 * @param value
 * @param array
 * @returns {number} returns the index of position.  -1 if not found, greater than -1 if found
 * @private
 */
function _find(byWhat, value, array){
    if(!byWhat){
        throw "Invalid Find Type";
    }
    if(isArray(array) !== true || array.length < 1) return -1;

    for(var i = 0; i < array.length; i++){
        if(array[i][byWhat] === value){
            return i;
        }
    }
    return -1;
}


/**
 * Add something to array
 * @param value
 * @param array
 * @returns {*} returns existing object if duplicate, returns length if success
 * @private
 */
function _add(value, array){
    if(typeof value !== 'object' || isArray(value)){
        throw "value must be an object";
    }
    for(var i = 0; i < array.length; i++){
        if(array[i].token === value.token || array[i].userId === value.userId){
            return array[i];
        }
    }
    array.push(value);
    return value;
}

/**
 * Create something
 * @param what
 * @param obj
 * @private
 */
function _create(what, value){
    switch(what){
        case "GET-query":
            _create__getQuery(value);
            break;

        case "UPDATE-query":
            _create__postQuery(value);
            break;

        case "DELETE-query":
            _create__deleteQuery(value);
            break;
        default:
            throw "Create what?";
    }
}

/**
 * Create Query
 * @param obj
 * @returns {*}
 * @private
 */
function _create__getQuery(value){
    var alias = value;

    var query;

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
    }

    return query;
}

// TODO
function _create__postQuery(value){

}

function _create__deleteQuery(value){

}