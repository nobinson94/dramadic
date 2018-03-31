const express = require('express');

const app = express();

const auth = require('./auth');
const srt_to_db = require('./srt_to_db');
const video = require('./videos');
const search = require('./search');

app.use('/auth', auth);
app.use('/srt_to_db', srt_to_db);
app.use('/script', video);
app.use('/search', search);

module.exports = app;