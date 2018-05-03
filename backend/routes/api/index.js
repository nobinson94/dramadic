const express = require('express');

const app = express();

const auth = require('./auth');
const video = require('./videos');
const word = require('./words');
const user = require('./user');
const upload = require('./upload');

app.use('/auth', auth);
app.use('/videos', video);
app.use('/words', word);
app.use('/users', user);
app.use('/upload', upload);

module.exports = app;