const express = require('express');
const app = express();

//post to register
app.post('/register', (req, res) => {});

//delete to register
app.delete('/register', (req, res) => {});

//post to login
app.post('/login', (req, res) => {});

app.listen(1337, () => console.log('User Authentication Service listening on port 1337');

