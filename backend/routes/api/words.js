const express = require('express');
const mysql = require('mysql');

const krdict = require('../../lib/krdict_api');

const router = express.Router();
let db = require(__DBdir);

router.get('/', async function(req, res, next) {
	let lang = req.query.lang;
	let method = req.query.method;
	let resultData = null;

	switch(method) {
	case 'view' :
		let code = req.query.code;
		resultData = await krdict.requestByView(code, lang);
		break;
	case 'search' :
		let index = 1;
		let words = req.query.words;
		let matchData = await krdict.requestBySearch(words);
		resultData = [];
		if(matchData.length!==0) {
			for(let data of matchData) {
				resultData.push(await krdict.requestByView(data.code, lang, index));
				index++;
			}
		}
		break;
	}
	
	console.log(resultData);
	res.send(resultData);
});


module.exports = router;