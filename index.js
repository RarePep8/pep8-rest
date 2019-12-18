const express = require('express'),
  users = require('./routes/users');

// Create an Express object and routes (in order)
const app = express();
app.use('/users', users);
app.use(getDefault);

function getDefault(req, res) {
  res.send('default');
}

exports.gacha = app;