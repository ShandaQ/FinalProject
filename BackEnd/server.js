var express = require('express');

// allows a web app in a different domain to access this api
var cors = require('cors');

var session = require('express-session');

//middleware
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var randToken = require('rand-token');
// var token = randToken.generate(64);

var sentiment = require('sentiment');
var sentimentAnalysis = require('sentiment-analysis');


var mongoose = require('mongoose');
var Promise = require("bluebird");
// mongoose.Promises = require('bluebird');

var review = require('./review');
var lawEnforcement = require('./lawenforcement');

var app = express();

// allows a web app in a different domain to access this api
app.use(cors());

// middleware
// register the application with the middleware
// parsers the json formated body data
// save the requests in req.body, as a javascript
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/guardian');


app.get('/getreviews', function(req, res){
  review.find(function(err, review){
    if(err){
      console.error(err.message);
      return;
    }
    console.log(review);
    res.json({
      "status": "ok",
      review: review
    });
  });
});

app.post('/postreview', function(req, res){
  // gets the content from the body - what the user entered
  var newReview = req.body;

  console.log(newReview);
  //sets the reviewRating between -1 and +1
  score = sentimentAnalysis(newReview.reviewContent);
  console.log("score: ", score);
  newReview.reviewRating = score;

    // reveiwScore = sentiment(newReview.reviewContent);
    // console.log("score:", reveiwScore.score);

  // pass that information and create a new row in the database
  review.create(newReview)
    .then(function(status){
      res.json({
        "status": "ok",
        message: status
      });
      return;
    })
    .catch(function(err){
      console.error(err.message);
      res.send({
        status: 'fail',
        message: err.errors
      });
      return;
    });
});

app.listen(8000, function(){
  console.log("Listening on port 8000");
});
