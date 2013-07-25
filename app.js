
/**
 * Module dependencies.
 */
var express = require('express')
    , http = require('http')
    , path = require('path')
//    , reviews = require('./routes/reviews')
//    , api = require('./routes/api')
    , processor = require('./routes/processor');

var app = express();

app.configure(function(){
    app.set('port', process.env.VCAP_APP_PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', function(req, res) {
    res.send('Hello from Want My Bucks Back Client Driver: ' + process.env.CONTROLLER_PORT);
});

//app.post('/api/cache/:id?', api.updateVersion);
//app.post('/api/review/:id?', api.saveReview);//temporarely
//app.post('/process/review', processor.processReview);


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

processor.initialize(server);