//get all packages
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config/database');
var User = require('./app/models/user');

//configure database and port
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

//configure bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup routes
app.get('/',function(req,res){
  res.send('Hi there! Hope you are doing great. Go ahead and explore the API, it is available at http://localhost:'+ port + '/api');
});

app.listen(port);
console.log('Server running at http://localhost:' + port);
