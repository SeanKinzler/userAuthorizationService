const express = require('express');
const app = express();
const passport = require('passport');
require('./login.js')(passport);

module.exports = (app, passport) => {
  //Testing Interface:
  app.use(express.static(__dirname));

  //Google:
  app.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  app.get('/login/google/callback', passport.authenticate('google', {
    successRedirect : '/login/google/success',
    failureRedirect : '/login/google/failure'
  }));
  app.get('/login/google/success', (req, res) => {res.send({ message: 'success', data: JSON.stringify(req.user) })});
  // app.get('/login/google/success', (req, res) => {res.send({message: 'success', data: JSON.stringify(req['user']['google'])})});
  app.get('/login/google/failure', (req, res) => {res.send({message: 'failure'})});

  //Facebook:
  app.get('/login/facebook', passport.authenticate('facebook', {scope: ['profile', 'email']}));
  app.get('/login/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/login/facebook/success',
    failureRedirect : '/login/facebook/failure'
  }));
  app.get('/login/facebook/success', (req, res) => {res.send({message: 'success'})});
  app.get('/login/facebook/failure', (req, res) => {res.send({message: 'failure'})});

  //Twitter:
  app.get('/login/twitter', passport.authenticate('twitter', {scope: ['profile', 'email']}));
  app.get('/login/twitter/callback', passport.authenticate('twitter', {
    successRedirect : '/login/twitter/success',
    failureRedirect : '/login/twitter/failure'
  }));
  app.get('/login/twitter/success', (req, res) => {res.send({message: 'success'})});
  app.get('/login/twitter/failure', (req, res) => {res.send({message: 'failure'})});
};
