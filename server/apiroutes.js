'use strict';
var baucis = require('baucis'),
  passport = require('passport'),
  mongoose = require('mongoose');
var setupRoutes = function(app) {
  var userController;

  userController = baucis.rest({
    singular: 'user',
    head: false,
    get: false,
    put: false,
    del: false
  });

  userController.documents('post', function(request, response, next) {
    // Automatically login if successful registration
    request.login(request.baucis.documents, function(err) {
      if (err) {
        return next(err);
      }
    });
    next();
  });

  app.post('/api/login',
    passport.authenticate('local'),
    function(req, res) {
      res.json(req.user);
    }
  );

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  function ensureAuthentication(request, response) {
    if (!request.isAuthenticated()) {
      response.send(401, {
        status: 401,
        message: 'Not authenticated',
        type: 'NOT_AUTHENTICATED'
      });
      return false;
    } else {
      return true;
    }
  }

  function setUserId(request) {
    request.body.userId = new mongoose.Types.ObjectId(request.user.id);
  }
}

module.exports = {
  setupRoutes: setupRoutes
};