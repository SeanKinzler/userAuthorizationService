const express = require('express');
const session = require('express-session')
const app = express();
// const mongoose = require('mongoose');
const passport = require('passport');

//Setup Database:
// const database = require('./database');
// mongoose.connect('mongodb://localhost/test');
// mongoose.connect(database.url);

//Setup Passport:
app.use(session({secret: '___'}));  //I'm not sure what this does.
app.use(passport.initialize());
app.use(passport.session());  //Make sessions persistent

//Setup Routes:
require('./route')(app, passport);

//Start Server:
app.listen(8080, () => console.log('User Authentication Service listening on port 8080'));
