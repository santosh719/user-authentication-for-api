# user-authentication-for-api
Simple user authentication for RESTful API's

This is a quick-start application that demonstrates basic authentication using JWT and Sequelize. It is built with:
* [Node.js](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [JSON Web Tokens](https://jwt.io/)
* [Sequelize](http://sequelizejs.com)

## Requirements

As it is a Node application, you will need Node.js installed. 

The app uses a SQL database via Sequelize ORM. It is implemented with PostgreSQL specifically.

## Installation

Clone the repository and simply run `npm install` from the root folder.

## Configuration

In order to run the application, a database connection string has to be configured. The connection string is stored in `app/config/database.js`.

When Sequelize is configured, you can run the setup script that creates the `users` table and also adds one default user (name: `Santosh Bidve`, password: `password`). From the browser go to the following URL:

```
http://localhost:8080/setup
```

## Run the application

From the root folder of the project, you can run the application with: 
```
node app.js
```
You can then access the application on `http://localhost:8080`.

Available pages:
* Landing page `http://localhost:8080`
* Setup page `http://localhost:8080/setup`
* API Welcome page [requires authentication] `http://localhost:8080/api`
* API Users Page [requires authentication] on `http://localhost:8080/api/users`


## Get the access token

To get the access token, you will have to make a post call to `http://localhost:8080/api/authenticate` with parameters -  `name : Santosh Bidve , password : password`.
The Node.js request code for this is as below :-
```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:8080/api/authenticate',
  headers: 
   { 'postman-token': 'af21b1a4-feff-dbdf-a93f-ed3873259a37',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: { name: 'Santosh Bidve', password: 'password' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

Thanks!

## License

Author: [Santosh Bidve](http://santoshb.me)

License: The MIT License (MIT)
