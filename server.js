//get all packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var dbconfig = require('./config/database');
var User = require('./app/models/user');
var router = require('./config/apiRouter')(app, express, User, jwt);

//configure database and port
var port = process.env.PORT || 8080;
//mongoose.connect(dbconfig.database);
app.set('superSecret', dbconfig.secret);

//configure bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//setup morgan to log requests
app.use(morgan('dev'));


//setup public routes
app.get('/', function(req, res) {
  res.send('Hi there! Hope you are doing great. Go ahead and explore the API, it is available at http://localhost:' + port + '/api');
});

//route to create user
app.get('/setup', function(req, res) {
  //sample user
  var sampleUser = User.build({
    name: 'Santosh Bidve',
    password: 'password',
    admin: true
  });

  //save user
  sampleUser.save().then(function() {
    console.log('user saved sucessfully');
    res.json({
      success: true
    });
  }).catch(function(err) {
    if (err) throw err;
    res.json({
      success: false,
      message: "error while creating "
    });
  });

});

//start server
app.listen(port);
console.log('Server running at http://localhost:' + port);

//use api routes
app.use('/api', router);
