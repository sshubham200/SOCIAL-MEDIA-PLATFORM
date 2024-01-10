const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'
},  
function(email, password, done) {
  User.findOne({ email: email })
      .then(user => {
          if (!user || user.password !== password) {
              console.log('Invalid credentials');
              return done(null, false);
          }

          return done(null, user);
      })
      .catch(err => {
          console.log('Error in finding user');
          return done(err);
      });
}

));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {

User.findById(id)
  .then(user => {
    if (!user) {
      console.log('User not found');
      return done(null, false); // Indicate that the user was not found
    }
    return done(null, user);
  })
  .catch(err => {
    console.error('Error in finding user:', err);
    return done(err);
  });

  });

  passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('../users/sign-in');
  }

  passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
      //req.user contains curret signed in user 
      res.locals.user=req.user;
    }
    next();
  }

  module.exports = passport;








