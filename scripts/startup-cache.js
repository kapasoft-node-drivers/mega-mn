var redis = require('redis')
    , db = redis.createClient()
    , sugar = require('sugar')
    , config = require('./../config')
    , http = require('http');

//db.flushdb( function (err, didSucceed) {
//    if(err){console.log('error: ' + err.message);}
//    console.log("cache flush status: " + didSucceed); // true
//    process.exit();
//});

var options = {
    host: config.controller_host,
    port: config.controller_port,
    path: config.controller_url + 'api/review/'
}

console.log('importing the list of reviews into cache ...');
//import the list of reviews into cache
http.get(options, function(res) {
    var reviewList = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        reviewList += chunk;
    });

    res.on('end',function(){
        console.log('*** caching reviews ***');
        var reviewMap = JSON.parse(reviewList);
        reviewMap.each(function(review){
            db.zadd('reviews',review.id, review.id, function(err, args){
                if(err) {
                    console.log('error saving in redis  sorted list - reviews');
                }
            });
        });
        process.exit();
    });
}).on('error', function(e) {
        console.log("Got error when requesting for update: " + e.message);
        process.exit();
    });

