const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const request = require('request');
const multiparty = require('multiparty');
const path = require('path');
const convertSRT = require('../../lib/convertSRT_api');

const router = express.Router();

let db = require(__DBdir);
let conn;

router.post('/tmp', function(req, res, next) {
	console.log("hello");
	console.log(req.body);
	res.send("SUCCESS");
});


module.exports = router;