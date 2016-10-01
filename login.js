//********************
//Requirements
//********************
//Import strategy modules:
// const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const passport = require('passport');
// const session = require('express-session');

//Setup MongoDB:
const User = require('./database').user;

//Setup Authorization Variables:
const configAuth = require('./auth');

module.exports = (passport) => {
  //********************
  //Serialization
  //********************
  //NOTE: FIGURE OUT HOW THIS WORKS
  passport.serializeUser((user, done) => {
    done(null, user.id);  //NOTE: WHAT IS user.id?
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
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
  const googleStrategy = new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL
    },
    (token, refreshToken, profile, done) => {
      console.log('before nextTick');
      process.nextTick(() => {
        //Search for the user in our database:
        searchGoogleUser(token, profile, done);
      });
    }
  );

  //Creates a new Google user
  const createGoogleUser = (token, profile) => {
    const newUser = new User();
    newUser.google.id = profile.id;
    newUser.google.token = token;
    newUser.google.name = profile.displayName;
    newUser.google.email = profile.emails[0].value;

    return newUser;
  }

  //Search for a Google user in our database:
  const searchGoogleUser = (token, profile, done) => {
    console.log('inside searchGoogleUser');
    User.findOne({'google.id': profile.id}, (err, user) => {
      if (err) {                  //Error occured
        return done(err);
      } else if (user) {          //User found, proceed with login
        return done(null, user);
      } else {                    //No user found
        //Create a new user:
        const newUser = createGoogleUser(token, profile);
        //Save the new user:
        newUser.save((err) => {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    });
  }

  passport.use(googleStrategy);

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


