const express = require('express');

const app = express();

const auth = require('./auth');
const video = require('./videos');
const word = require('./words');
const search = require('./search');

app.use('/auth', auth);
app.use('/videos', video);
app.use('/words', word)
app.use('/search', search);

module.exports = app;