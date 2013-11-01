
var vcap_services = process.env.VCAP_SERVICES;
var rediscloud_service = JSON.parse(vcap_services)["rediscloud-n/a"][0]
var credentials = rediscloud_service.credentials;

var redis = require('redis')
    , db = redis.createClient(credentials.port, credentials.hostname, {no_ready_check: true});
db.auth(credentials.password);

db.flushdb( function (err, didSucceed) {
    if(err){console.log('error: ' + err.message);}
    console.log("cache flush status: " + didSucceed); // true
    process.exit();
});
