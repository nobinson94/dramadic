var express = require('express');
var mysql = require('mysql');
var xml2js = require('xml2js');
var request = require('request');
var urlencode = require('urlencode');

var router = express.Router();
let db = require(__DBdir);


let searchWord = (targetcode, lang) => new Promise((resolve) => {
	var parser = new xml2js.Parser();
	
	var data = {
		name: '',
		index: '',
		pos: '',
		senses: Array,
	};
	var myAPIkey = "D393C1F077CF383BB7CDE21F07BE0ADD";
	var baseURL = "https://krdict.korean.go.kr/api/view";
	var query = {
		key: myAPIkey,
		method: 'target_code',
		q: targetcode,
		trans_lang: lang,
	}
	var options = {
		url: baseURL,
		qs: query
	}
	request(options, function(err, res, body){
		if(err) console.log(err);
		parser
		 .parseString(body, function(err, result) {
		 	if(result.channel.total[0] !== '0') {
		 		var item = result.channel.item[0].word_info[0];
		 		console.log(item);

		 		data.name = item.word[0];
		       	data.index = item.sup_no[0]; // 동형어 넘버 
		       	data.pos = item.pos[0]; // 품사 
		       	data.senses = item.sense_info;
		 	}
		 	resolve(data);
		})
	})
})

router.get('/:wordcode/lang/:langnum', async function(req, res, next) {
	let targetcode = parseInt(req.params.wordcode);
	let lang = parseInt(req.params.langnum);

	let result = await searchWord(targetcode, lang);
	res.send(result);

})

module.exports = router;