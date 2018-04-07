var express = require('express');
var mysql = require('mysql');
var xml2js = require('xml2js');
var request = require('request');
var urlencode = require('urlencode');

var router = express.Router();
let db = require(__DBdir);



router.get('/:wordcode/lang/:langnum', function(req, res, next) {
	let targetcode = parseInt(req.params.wordcode);
	let lang = parseInt(req.params.langnum);

	var parser = new xml2js.Parser();
	var data = [];
	var myAPIkey = "D393C1F077CF383BB7CDE21F07BE0ADD";
	var baseURL = "https://krdict.korean.go.kr/api/view";
	var query = {
		key: myAPIkey,
		method: 'targetcode',
		q: targetcode,
		trans_lang: lang,
	}
	var options = {
		url: baseURL,
		qs: query
	}
	console.log(options);
	request(options, function(err, res, body){
		if(err) console.log(err);
		parser
		 .parseString(body, function(err, result) {
		 	console.log(result.channel);
		 	/*if(result.channel.total[0] !== '0') {
		 		var item = result.channel.item;
		 		console.log(item);
		 		data.name = item.word[0];
		       	data.index = item.sup_no[0]; // 동형어 넘버 
		       	data.pos = item.pos[0]; // 품사 
		       	data.senses = item.sense;
		 	}*/
		 	
		})

	})
	res.send('0');

})
module.exports = router;