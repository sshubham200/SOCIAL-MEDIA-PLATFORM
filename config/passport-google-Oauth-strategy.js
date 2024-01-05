const passport = require('passport');
// const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "518028826775-m9l24rjudo434pdmv5vs8oj1bf9mi5ud.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        // Finding a user with the provided email in the MongoDB database
        User.findOne({ email: profile.emails[0].value })
            .exec()
            .then(user => {
                if (user) {
                    // If user exists, return the user
                    console.log('user found');
                    done(null, user);
                } else {
                    // If user does not exist, create a new user
                    return User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });
                }
            })
            .then(newUser => {
                // Newly created user or user found in the previous step
                if (newUser) {
                    console.log('user created');
                    done(null, newUser);
                }
            })
            .catch(err => {
                console.log('error in google strategy-passport', err);
                done(err);
            });
    }
    
    
))

module.exports = passport;