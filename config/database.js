var Sequelize = require('sequelize');

//initialize database

var sequelize = new Sequelize('example', 'postgres', '1234', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    });

//authenticate user and establish connection
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

  module.exports = {
    'database':sequelize,
    // 'database':'mongodb://test:test@ds117271.mlab.com:17271/user-authentication-for-api',
    'secret':'userauthapi'
  };
