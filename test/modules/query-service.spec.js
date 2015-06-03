"use strict";

/**
 * Query Service Spec
 **/


var expect = require('chai').expect;

var QueryService = require('./../../src/modules/query-service');


describe('Query Service', function(){

    describe('Generate queries', function(){

        describe('User', function(){

            it('should obtain GET user query', _GenerateQueries__User__GET);

            it('should obtain POST user query', _GenerateQueries__User__POST);

            it('should NOT obtain DELETE user query', _GenerateQueries__User__DELETE);

        });

        describe('Body Measurements', function(){

            it('should obtain GET body-measurements query', _GenerateQueries__BodyMeasurements_GET);

            it('should obtain POST body-measurements query', _GenerateQueries__BodyMeasurements_POST);

            it('should NOT obtain DELETE body-measurements query', _GenerateQueries__BodyMeasurements_DELETE);

        });

        describe('Body Weights', function(){

            it('should obtain GET body-weights query', _GenerateQueries__BodyWeights_GET);

            it('should obtain POST body-weights query', _GenerateQueries__BodyWeights_POST);

            it('should obtain DELETE body-weights query', _GenerateQueries__BodyWeights_DELETE);

        });


        describe('Body Fat', function(){

            it('should obtain GET body-fat query', _GenerateQueries__BodyFat_GET);

            it('should obtain POST body-fat query', _GenerateQueries__BodyFat_POST);

            it('should obtain DELETE body-fat query', _GenerateQueries__BodyFat_DELETE);

        });


        describe('Badge', function(){

            it('should obtain GET badge query', _GenerateQueries__Badge_GET);

            it('should obtain POST badge query', _GenerateQueries__Badge_POST);

            it('should NOT obtain DELETE badge query', _GenerateQueries__Badge_DELETE);

        });

        describe('Time series', function(){
// TODO
       //     it('should obtain GET time series query', _GenerateQueries__TimeSeries_GET);

        //    it('should NOT obtain POST time series query', _GenerateQueries__TimeSeries_POST);

         //   it('should NOT obtain DELETE time series query', _GenerateQueries__TimeSeries_DELETE);

        });

        describe('Weight Goal', function(){

            it('should obtain GET weight-goal query', _GenerateQueries__WeightGoal_GET);

            it('should obtain POST weight-goal query', _GenerateQueries__WeightGoal_POST);

            it('should NOT obtain DELETE weight-goal query', _GenerateQueries__WeightGoal_DELETE);

        });

        describe('Fat Goal', function(){

            it('should obtain GET fat-goal query', _GenerateQueries__fatGoal_GET);

            it('should obtain POST fat-goal query', _GenerateQueries__fatGoal_POST);

            it('should obtain DELETE fat-goal query', _GenerateQueries__fatGoal_DELETE);

        });

        describe('Activities', function(){
// TODO
            it('should obtain GET activities query', _GenerateQueries__activities_GET);

            it('should obtain POST activities query', _GenerateQueries__activities_POST);

            it('should NOT obtain DELETE activities query', _GenerateQueries__activities_DELETE);

        });


        describe('recent-activity', function(){

            it('should obtain GET recent-activity query', _GenerateQueries__recentActivity_GET);

            it('should obtain POST recent-activity query', _GenerateQueries__recentActivity_POST);

            it('should obtain DELETE recent-activity query', _GenerateQueries__recentActivity_DELETE);

        });


        describe('frequent-activity', function(){

            it('should obtain GET recent-activity query', _GenerateQueries__frequentActivity_GET);

            it('should obtain POST recent-activity query', _GenerateQueries__frequentActivity_POST);

            it('should obtain DELETE recent-activity query', _GenerateQueries__frequentActivity_DELETE);

        });

        describe('activity-daily-goal', function(){

            it('should obtain GET activity-daily-goal query', _GenerateQueries__activityDailyGoal_GET);

            it('should obtain POST activity-daily-goal query', _GenerateQueries__activityDailyGoal_POST);

            it('should obtain DELETE activity-daily-goal query', _GenerateQueries__activityDailyGoal_DELETE);

        });

        describe('activity-weekly-goal', function(){

            it('should obtain GET activity-week-goal query', _GenerateQueries__activityWeeklyGoal_GET);

            it('should obtain POST activity-week-goal query', _GenerateQueries__activityWeeklyGoal_POST);

            it('should obtain DELETE activity-week-goal query', _GenerateQueries__activityWeeklyGoal_DELETE);

        });

        describe('activity-stats', function(){

            it('should obtain GET activity-stats query', _GenerateQueries__activityStats_GET);

            it('should obtain POST activity-stats query', _GenerateQueries__activityStats_POST);

            it('should obtain DELETE activity-stats query', _GenerateQueries__activityStats_DELETE);

        });

        /** // TODO
        it('should obtain series query', _GenerateQueries__seriesQuery);

        it('should obtain activity-stats query', _GenerateQueries__activitesStatsQuery);

        it('should obtain time-series query', _GenerateQueries__timeSeriesQuery);
         **/

    });
});


/**
 * Standard GET Test
 * @param alias
 * @param stdJSONURL
 * @param dateRequired
 * @private
 */
function _GenerateQueries__StandardGETTest(alias, stdJSONURL, dateRequired){

    // TEST JSON with no ID
    var output  = stdJSONURL;
    var value   = {
        alias: alias,
        method: 'GET'
    };
    var date;
    if(dateRequired){
        date = stdJSONURL.match(/[\d-]+.(xml|json)$/);
        date = date[0].substring(0, 10);
        value.date = date;
    }

    var createQuery = QueryService.create(value);
    expect(createQuery).to.equal(output);

    // TEST XML with no ID
    value.format = 'xml';
    output = output.replace('.json','.xml');
    createQuery = QueryService.create(value);
    expect(createQuery).to.equal(output);


    // TEST JSON with ID
    value.format = 'json';
    output = output.replace('.xml','.json');
    output = output.replace('-','1234');
    value.userId = 1234;

    // TEST XML with ID
    output = output.replace('.json','.xml');
    value.format = 'xml';
    createQuery = QueryService.create(value);
    expect(createQuery).to.equal(output);

    if(dateRequired){
        delete value.date;
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");

        output = output.replace('.xml','.json');
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");

        output = output.replace('1234','-');
        delete value.userId;
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");

        output = output.replace('.json','.xml');
        expect(function(){
            QueryService.create(value);
        }).to.throw("Date is not set!");
    }
}

/**
 * Standard POST Test
 */
function _GenerateQueries__StandardPOSTTest(alias, stdJSONURL){
    // TEST JSON with no ID
    var output  = stdJSONURL;
    var value   = {
        alias: alias,
        method: 'POST'
    };

    var postQuery = QueryService.create(value);
    expect(postQuery).to.equal(output);

    // TEST XML with no ID
    value.format = 'xml';
    output = output.replace('.json','.xml');
    postQuery = QueryService.create(value);
    expect(postQuery).to.equal(output);


    // TEST JSON with ID
    value.format = 'json';
    output = output.replace('.xml','.json');
    output = output.replace('-','1234');
    value.userId = 1234;

    // TEST XML with ID
    output = output.replace('.json','.xml');
    value.format = 'xml';
    postQuery = QueryService.create(value);
    expect(postQuery).to.equal(output);


    // add parameters

    // user name specified
    output += '?gender=MALE&birthday=2015-02-15';
    value.data = {
        gender: 'MALE',
        birthday: '2015-02-15'
    };
    postQuery = QueryService.create(value);

    expect(postQuery).to.equal(output);

    // do the same in xml
    output = output.replace('json','xml');

    postQuery = QueryService.create(value);

    expect(postQuery).to.equal(output);
}

/**
 * Standard Delete Test
 * @param alias
 * @param stdJSONURL
 * @private
 */
function _GenerateQueries__StandardDELETETest(alias, stdJSONURL){

    var output = stdJSONURL;

    var idVal   = stdJSONURL.match(/[\d]+.json$/);
    if(!idVal){
        throw "Invalid ID value in delete test json url string";
    }

    var number = idVal[0].split('.')[0];

    var value = {
        alias: alias,
        method: 'DELETE',
        data: {
            id: number
        }
    };

    var deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // try with user name
    output = output.replace('-','1234');
    value.userId = 1234;
    deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // try with .xml
    output = output.replace('.json', '.xml');
    value.format = 'xml';
    deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // try with .xml and no id
    output = output.replace('1234','-');
    delete value.userId;
    deleteQuery = QueryService.create(value);
    expect(deleteQuery).to.equal(output);

    // delete data.id
    delete value.data.id;
    expect(function(){
        QueryService.create(value);
    }).to.throw("Delete ID cannot be undefined");

    // delete data obj
    delete value.data;
    expect(function(){
        QueryService.create(value);
    }).to.throw("Delete ID cannot be undefined");
}

/**
 * Standard Delete Not Existing Test
 * @param alias
 * @private
 */
function _GenerateQueries__StandardNotExistTest(alias, method){
    var value = {
        alias: alias,
        method: method
    };
    expect(function(){
        QueryService.create(value);
    }).to.throw("That method, "+value.method+" does not exist for " + value.alias);
}

/**
 *
 */
function _GenerateQueries__User__GET(){
    var testJSONURL = 'https://api.fitbit.com/1/user/-/profile.json';
    _GenerateQueries__StandardGETTest('user', testJSONURL);
}

function _GenerateQueries__User__POST(){
    var output = 'https://api.fitbit.com/1/user/-/profile.json';
    _GenerateQueries__StandardPOSTTest('user', output);
}

function _GenerateQueries__User__DELETE(){
    _GenerateQueries__StandardNotExistTest('user', 'DELETE');
}

function _GenerateQueries__BodyMeasurements_GET(){
    // Date speficied, user non specfified, method get, json
    var output = 'https://api.fitbit.com/1/user/-/body/date/2015-03-01.json';
    _GenerateQueries__StandardGETTest('body-measurements',output, true);
}

/**
 * Body Measurements POST
 * @private
 */
function _GenerateQueries__BodyMeasurements_POST(){
    // Date speficied, user specfified, method get, xml
    var output = 'https://api.fitbit.com/1/user/-/body.json';
    _GenerateQueries__StandardPOSTTest('body-measurements', output);
}

function _GenerateQueries__BodyMeasurements_DELETE(){
    _GenerateQueries__StandardNotExistTest('body-measurements', 'DELETE');
}

/**
 * Body weight Get
 * @private
 */
function _GenerateQueries__BodyWeights_GET(){
    // Date speficied, user non specfified, method get, json
    var output = 'https://api.fitbit.com/1/user/-/body/log/weight/date/2015-02-21.json';
    _GenerateQueries__StandardGETTest('body-weight', output, true);
}

/**
 * Body WEight POST
 */
function _GenerateQueries__BodyWeights_POST(){
    // Date speficied, user specfified, method get, json
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/weight.json';
    _GenerateQueries__StandardPOSTTest('body-weight', jsonURL);
}

function _GenerateQueries__BodyWeights_DELETE(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/weight/300.json';
    _GenerateQueries__StandardDELETETest('body-weight', jsonURL);
}

function _GenerateQueries__BodyFat_GET(){
    // Date speficied, user non specfified, method get, json
    var output = 'https://api.fitbit.com/1/user/-/body/log/fat/date/2010-02-21.json';
    _GenerateQueries__StandardGETTest('body-fat', output, true);
}

function _GenerateQueries__BodyFat_POST(){
    // Date speficied, user specfified, method get, json
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/fat.json';
    _GenerateQueries__StandardPOSTTest('body-fat', jsonURL);
}

function _GenerateQueries__BodyFat_DELETE(){
    var output = 'https://api.fitbit.com/1/user/-/body/log/fat/300.json';
    _GenerateQueries__StandardDELETETest('body-fat', output);
}

/**
 * Generate Queries Badge GET
 * @private
 */
function _GenerateQueries__Badge_GET(){
    var output = 'https://api.fitbit.com/1/user/-/badges.json';
    _GenerateQueries__StandardGETTest('badges', output);
}

function _GenerateQueries__Badge_POST(){
    _GenerateQueries__StandardNotExistTest('badges','POST');
}

function _GenerateQueries__Badge_DELETE(){
    _GenerateQueries__StandardNotExistTest('badges', 'DELETE');
}

function _GenerateQueries__WeightGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/body/log/weight/goal.json';
    _GenerateQueries__StandardGETTest('weight-goal', output);
}
function _GenerateQueries__WeightGoal_POST(){
    // TODO
}

function _GenerateQueries__WeightGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('weight-goal', 'DELETE');
}

/**
 * Generate Queries => Series Query
 * @private
 */
function _GenerateQueries__seriesQuery(){

}

function _GenerateQueries__fatGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/body/log/fat/goal.json';
    _GenerateQueries__StandardGETTest('fat-goal', output);
}

function _GenerateQueries__fatGoal_POST(){
    var jsonURL = 'https://api.fitbit.com/1/user/-/body/log/fat/goal.json';
    _GenerateQueries__StandardPOSTTest('fat-goal', jsonURL);
}

function _GenerateQueries__fatGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('fat-goal', 'DELETE');
}

/**
 * Generate Queries => Activities Query
 * @private
 */
function _GenerateQueries__activities_GET(){
    // TODO
//    var jsonURL = 'https://api.fitbit.com/1/user/-/activities/date/2010-02-21.json';
//    _GenerateQueries__StandardGETTest('activities', jsonURL, true);
}
function _GenerateQueries__activities_POST(){

}
function _GenerateQueries__activities_DELETE(){
    _GenerateQueries__StandardNotExistTest('activities', 'DELETE');
}

function _GenerateQueries__recentActivity_GET() {
    var output = 'https://api.fitbit.com/1/user/-/activities/recent.json';
    _GenerateQueries__StandardGETTest('recent-activity', output);
}

function _GenerateQueries__recentActivity_POST() {
    _GenerateQueries__StandardNotExistTest('recent-activity', 'POST');
}

function _GenerateQueries__recentActivity_DELETE(){
    _GenerateQueries__StandardNotExistTest('recent-activity', 'DELETE');
}

function _GenerateQueries__frequentActivity_GET() {
    var output = 'https://api.fitbit.com/1/user/-/activities/frequent.json';
    _GenerateQueries__StandardGETTest('frequent-activity', output);
}

function _GenerateQueries__frequentActivity_POST() {
    _GenerateQueries__StandardNotExistTest('frequent-activity', 'POST');
}

function _GenerateQueries__frequentActivity_DELETE() {
    _GenerateQueries__StandardNotExistTest('frequent-activity', 'DELETE');
}

function _GenerateQueries__activityDailyGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/daily.json';
    _GenerateQueries__StandardGETTest('activity-daily-goal', output);
}

function _GenerateQueries__activityDailyGoal_POST(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/daily.json';
    _GenerateQueries__StandardPOSTTest('activity-daily-goal', output);
}

function _GenerateQueries__activityDailyGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('activity-daily-goal', 'DELETE');
}

function _GenerateQueries__activityWeeklyGoal_GET(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/weekly.json';
    _GenerateQueries__StandardGETTest('activity-weekly-goal', output);
}
function _GenerateQueries__activityWeeklyGoal_POST(){
    var output = 'https://api.fitbit.com/1/user/-/activities/goals/weekly.json';
    _GenerateQueries__StandardPOSTTest('activity-weekly-goal', output);
}
function _GenerateQueries__activityWeeklyGoal_DELETE(){
    _GenerateQueries__StandardNotExistTest('activity-weekly-goal', 'DELETE');
}

function _GenerateQueries__activityStats_GET(){
    var output = 'https://api.fitbit.com/1/user/-/activities.json';
    _GenerateQueries__StandardGETTest('activity-stats', output);
}

function _GenerateQueries__activityStats_POST(){
    _GenerateQueries__StandardNotExistTest('activity-stats', 'POST');
}

function _GenerateQueries__activityStats_DELETE(){
    _GenerateQueries__StandardNotExistTest('activity-stats', 'DELETE');
}

/**
 * Generate Queries => Activities Stats Query
 * @private
 */
function _GenerateQueries__activitesStatsQuery(){

}

/**
 * Generate Queries => Time Series Query
 * @private
 */
function _GenerateQueries__timeSeriesQuery(){

}
