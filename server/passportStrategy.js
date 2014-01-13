'use strict';
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('./dbsetup').UserModel;

var localPassportStrategy = function() {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if (!err) done(null, user);
      else done(err, null);
    });
  });
}


module.exports = {
  localPassportStrategy: localPassportStrategy
};