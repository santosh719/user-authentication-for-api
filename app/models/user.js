// // get an instance of mongoose and mongoose.Schema
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// // set up a mongoose model and pass it using module.exports
// module.exports = mongoose.model('User', new Schema({
//     name: String,
//     password: String,
//     admin: Boolean
// }));
//get packages
var Sequelize = require('sequelize');
var dbconfig = require('../../config/database');

//get connection
var sequelize = dbconfig.database;

//define Schema
var User = sequelize.define('User', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  admin: Sequelize.BOOLEAN
}, {
  updatedAt: 'last_update',
  createdAt: 'date_of_creation'
});

//create table
sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('Users Table created!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });

module.exports = User;
