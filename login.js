//********************
//Requirements
//********************
// const session = require('express-session');
const passport = require('passport');

//Import strategy modules:
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

//Setup MongoDB:
// const User = require('./database').user;

//Setup Authorization Variables:
const configAuth = require('./auth');

module.exports = (passport) => {
  //********************
  //Serialization
  //********************
  //NOTE: FIGURE OUT HOW THIS WORKS
  passport.serializeUser((user, done) => {
    done(null, user._json);  //Serialize the user's profile information
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  //********************
  //Strategies
  //********************
  //**********
  //Google
  //**********
  //NOTE: When is refreshToken actualy used?
  //NOTE: I don't really understand this from an internal standpoint.
  //NOTE: What exactly is done?
  passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL
    }, (token, refreshToken, profile, done) => done(null, profile)
  ));

  //**********
  //Facebook
  //**********
  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL
    }, (token, refreshToken, profile, done) => done(null, profile)
  ));

  //**********
  //Twitter
  //**********
  passport.use(new TwitterStrategy({
      consumerKey: configAuth.twitterAuth.consumerKey,
      consumerSecret: configAuth.twitterAuth.consumerSecret,
      callbackURL: configAuth.twitterAuth.callbackURL
    }, (token, refreshToken, profile, done) => done(null, profile)
  ));

  //**********
  //Local
  //**********
  //Set Strategy:
  // const localStrategy = new LocalStrategy(
  //   (username, password, done) => {
  //     User.findOne({username: username}, (err, user) => {
  //       if (err) {  //Error
  //         return done(err);
  //       } else if (!user) {  //Username not found
  //         return done(null, false, {message: 'Incorrect username.'});
  //       } else if (!user.validPassword(password)) {  //Password incorrect
  //         return done(null, false, {message: 'Incorrect password.'});
  //       } else {  //Login successful
  //         return done(null, user);
  //       }
  //     });
  //   };
  // );

  // const login = (req, res, next) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) {	         //Case: Error
  //       return next(err);
  //     } else if (!user) {  //Case: Authentication failed
  //       return res.send(400, 'Incorrect username');
  //     } else {             //Case: Authentication succeeded
  //       //Start a session:
  //       req.logIn(user, function(err) {
  //         if (err) {
  //           return next(err);
  //         } else {
  //           return res.send({message, 'Authentication successful'});
  //         }
  //       });
  //     }
  //   })(req, res, next);
  // };
};


