const express = require('express');
const app = express();

const makeclipmodule = require('./dramadicClip')
const makeScriptDB = require('./srt_to_db')
app.use('/makeclip', makeclipmodule);
app.use('/makeScriptdb', makeScriptDB);
module.exports = app;