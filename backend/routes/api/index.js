const express = require('express');

const app = express();

const auth = require('./auth');
const video = require('./videos');
const word = require('./words');
const search = require('./search');
const user = require('./user');

app.use('/auth', auth);
app.use('/videos', video);
app.use('/words', word)
app.use('/search', search);
app.use('/users', user);
module.exports = app;