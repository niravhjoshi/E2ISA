require('./api/data/db.js');
//Database connection string for monogodb

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var routes = require('./api/routes');
// Define the port to run on
app.set('port', 3000);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});


// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));


// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));


//app.use('./public/images/updImage', express.static(__dirname,'./public/images/updImage'));
//app.use(multer({dest: './public/images/updImage/'}))
// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
