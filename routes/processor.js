require('coffee-script');
var sugar = require('sugar')
    , io = require('socket.io')
    , Contact = require('domain/contact')
    , Newsletter = require('domain/newsletter');


exports.initialize = function(server) {
    io = io.listen(server);  //accepts HTTP Server
    io.set('log level', 1);
    //set up our message handler for socket.io messages
    io.sockets.on("connection", function(socket){
        console.log('some socket connected...');
        //add other listeners on the new socket just established
        socket.on('message', function(message){
            //wait to receive user message and then broadcasts to all others 
            console.log('From client received:' + message);
            message = JSON.parse(message);

            switch(message.type){
                case 'postReview':
//                    var review = new Review({
//                        title: message.title,
//                        content: message.content,
//                        submittedBy: message.submittedBy,
//                        recommendedFor: message.recommendedFor,
//                        'rentalUnit.id': message.rentalUnit
//                    });
//
//                    review.save(function(e){
//                        if(e) {
//                            console.log('Error saving review: ' + e.message);
//                            socket.send(JSON.stringify({type:'ERROR',
//                                message: e.message
//                            }));
//                        }else{
//                            socket.send(JSON.stringify({type:'AK',
//                                message: 'Thank you for submitting review. Your review is what makes it possible continue provide exceptional home like stay!'
//                            }));
//                        }
//
//                    });
                    console.log('posted review');
                    break;
                case 'postInq':
//                    var inquiry = new Inquiry({
//                        inqContent: message.content,
//                        'rentalUnit.id': message.rentalUnit,
//                        userEmail: message.email
//                    });
//
//                    inquiry.save(function(e){
//                        if(e) {
//                            console.log('Error saving inquiry: ' + e.message);
//                            socket.send(JSON.stringify({type:'ERROR',
//                                message: e.message
//                            }));
//                        }else{
//                            socket.send(JSON.stringify({type:'AK',
//                                message: 'Thank you for Inquiry. We will respond as soon as possible'
//                            }));
//                        }
//                    });
                    console.log('posted inquiry');
                    break;
                case 'postContactUs':
                    var contact = new Contact({name:message.name, email:message.email, phone:'1234567890', message: 'App: rental' + '\n' + message.subject + '\n' + message.message });
                    contact.save(function(e){
                        if(e){
                            console.log('Error saving contact: ' + e.message);
                        }else{
                            console.log('contact saved successfully...');
                        }
                    });
                    console.log('posted Contact Us');
                    break;
                case 'getTestimonial':
                    console.log('get testimonials');
                    break;
                case 'featuredTestimonials':
//                    var featuredReviews = [];
//
//                    //@ToDo once decided how user selects featured reviews, the hard coded Ids should be change
//                    Review.get(45, function(err, review){
//                        if(err) return next(err);
//                        featuredReviews.push(review);
//                        socket.emit('reviews', review);
//                    });
//
//                    Review.get(43, function(err, review){
//                        if(err){return next(err);}
//                        featuredReviews.push(review);
//                        socket.emit('reviews', review);
//                    });
                    console.log('get featured Testimonials');
                    break;
                case 'postNewsletter':
                    var newsletter = new Newsletter({email:message.email, hostname: message.website });
                    newsletter.save(function(e){
                        if(e){
                            console.log('Error saving newsletter: ' + e.message);
                        }else{
                            console.log('newsletter saved successfully...');
                        }
                    });
                    console.log('post Newsletter');
                    break;
                default:
                    console.log('***No request defined');
                    break;
            }

        });

    });


};

//
//exports.processReview = function(req, res){
//
//    var review = new Review({
//        title: req.body.title,
//        content: req.body.content,
//        submittedBy: req.body.submittedBy,
//        recommendedFor: req.body.recommendedFor
//    });
//
//    review.save(function(err){
//        if(err){
//            console.log('error to save review in processReview' + err.message);
//        }
//    });
//    console.log('New Review: ' + JSON.stringify(review));
//    res.send(200);
////        review.save(function(err){
////            if (err) {
////                res.render('reviewProcessed', {
////                    title: 'Error Processing review',
////                    message: err.message
////                });
////            }
////            res.render('reviewProcessed', {
////                title: 'Finished Processing review',
////                message: "Thank you for submiting Review"
////            });
////        });
//
//};
//
//exports.displayForm = function(req, res){
//    var html = '<html><head><title>some head</title></head><body><h1>Review Form</h1>'
//        + '<form method="post" action="/process/review" >'
//        + '<p>Title: <input type="text" name="title" /></p>'
//        + '<p>Content: <input type="text" name="content" /></p>'
//        + '<p>Nickname: <input type="text" name="submittedBy" /></p>'
//        + '<p>Recommended for: <input type="text" name="recommendedFor" /></p>'
//        + '<p><input type="submit" value="Submit Review" /></p>'
//        + '</form></body></html>';
//    res.setHeader('Content-Type', 'text/html');
////    res.writeHead(200, {"Content-Type": "text/html"});
//    res.setHeader('Content-Length', Buffer.byteLength(html));
////    res.write(html);
////    res.end();
//    res.end(html);
//    res.send(html);
//};