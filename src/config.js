"use strict";

var Config = {};

Config.oauthURL         = "http://www.fitbit.com/oauth/authorize?oauth_token=";

Config.requestTokenURL  = "https://api.fitbit.com/oauth/request_token";

Config.accessTokenURL   = "https://api.fitbit.com/oauth/access_token";

Config.oauthVersion     = "1.0";

Config.encryptionMethod = "HMAC-SHA1";

Config.userResourceURL  = "https://api.fitbit.com/1/user/";

Config.CONSUMER_KEY     = '';

Config.CONSUMER_SECRET  = '';

Config.defaultLocale    = 'en_US';

Config.defaultMetric    = 'METRIC';


/**
 * Available locales
 *
     ja_JP	Japan
     fr_FR	France
     es_ES	Spain
     en_US
     United States (default)
     en_NZ	New Zealand
     en_GB
     United Kingdom
     en_AU	Australia
     de_DE	Germany

 */

module.exports = Config;
