const express = require('express');
const mysql = require('mysql');

const krdict = require('../../lib/krdict_api');

const router = express.Router();
let db = require(__DBdir);

router.get('/', async function(req, res, next) {
	let lang = req.query.lang;
	let code = req.query.code;

	let data = await krdict.requestByView(code, lang);
	
	console.log(data);
	res.send(data);
});

module.exports = router;