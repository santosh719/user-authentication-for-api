module.exports = function(app, express, User, jwt) {

  //api routes
  var apiRoutes = express.Router();

  //route to user authentication
  apiRoutes.post('/authenticate', function(req, res) {

    //find the user
    User.findOne({
      where: {
        'name': req.body.name
      }
    }).then(function(user) {

      //check if user exists
      if (!user) {

        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });

      } else if (user) {

        //check if password matches
        if (user.password != req.body.password) {

          res.json({
            success: false,
            message: 'Authentication failed. Wrong password'
          });

        } else {

          //create token if authentication successful
          var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60*24),
            data: req.body.password
          }, app.get('superSecret'));

          //return token
          res.json({
            success: true,
            message: 'Here is your token',
            token: token
          });

        }
      }
    }).catch(function(err) {
      if (err) throw err;
      res.json({
        success: false,
        message: "error while fetching user"
      });
    });
  });

  //route middleware to verify token
  apiRoutes.use(function(req, res, next) {
    console.log("in api routes");
    //fetch token from headers, query string, etc.
    var token = req.body.token || req.query.token || req.header['x-access-token'];

    //if token exists then verify
    if (token) {

      //verify with passport jsonwebtoken
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        // if error then return success false
        if (err) {

          return res.json({
            sucess: false,
            message: 'Failed to authenticate token.'
          });

        } else {
          //else decode and proceed to the next step
          req.decoded = decoded;
          next();
        }
      });

    } else {
      //if no token exists then return 403
      return res.status(403).send({
        sucess: false,
        message: 'No token provided'
      });
    }
  });

  //root URL
  apiRoutes.get('/', function(req, res) {
    res.send({
      message: 'Welcome to the awesome API'
    });
  });

  //route to list all the users
  apiRoutes.get('/users', function(req, res) {
    User.findAll().then(function(users) {
      res.json(users);
    }).catch(function(err) {
      if (err) throw err;
      res.json({
        success: false,
        message: "error while fetching users"
      });
    });
  });

  return apiRoutes;
};
