const express = require('express');
const app = express();
const passport = require('passport');
require('./login.js')(passport);

module.exports = (app, passport) => {
  app.post('/register', (req, res) => {});
  app.delete('/register', (req, res) => {});
  // app.post('/login', (req, res) => {});

  //Testing Interface:

  // app.get('/', (req, res) => {
  //   console.log('Index.html');
  //   console.log(__dirname + '/index.html');
  //   res.redirect(__dirname + '/index.html');
  // })

  app.use(express.static(__dirname));

  //Google:
  app.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  // app.get('/login/google/callback',(req, res, next) => {
  //   console.log('In Callback');
  //   passport.authenticate('google', (err, user, info) => {
  //     console.log(Arguments);
  //     if(err) { //Case: Error
  //       console.log('Auth error');
  //       return next(err); //NOTE: Make sure that this works.
  //     } else if(!user) {  //Case: Authentication failed
  //       console.log('Auth failure');
  //       res.send(400, 'Authentication failed');
  //       res.redirect('/');
  //     } else {  //Case: Authentication succeeded
  //       console.log('Auth success');
  //       res.send({message: 'Authentication successful'});
  //       res.redirect('/');
  //     }
  //   });
  // });

  app.get('/login/google/callback', passport.authenticate('google', {
    successRedirect : '/login/google/success',
    failureRedirect : '/login/google/failure'
  }));

  app.get('/login/google/success', (req, res) => {res.send({message: 'success'})});
  app.get('/login/google/failure', (req, res) => {res.send({message: 'failure'})});

  // app.get('/logout', (req, res) => {
  //   req.logout();
  //   res.send({message: 'Logged out'});
  // });



  //post to register
  app.post('/register', (req, res) => {});
  
  //delete to register
  app.delete('/register', (req, res) => {});

  //post to login
  app.post('/login', (req, res) => {});
  app.post('/login/google', (req, res) => {});

};
