var redis = require('redis')
    , db = redis.createClient();

db.flushdb( function (err, didSucceed) {
    if(err){console.log('error: ' + err.message);}
    console.log("cache flush status: " + didSucceed); // true
    process.exit();
});
