var request = require('request');
var urlencode = require('urlencode');
var xml2js = require('xml2js');


var parser = new xml2js.Parser();
var baseURL = "https://krdict.korean.go.kr/api"
var myAPIkey = "D393C1F077CF383BB7CDE21F07BE0ADD" 


export.requestBySearch = function (word, lang) {
	var query = {
		key: myAPIkey,
		q: word,
		sort: sort,
		translated: 'y',
		trans_lang: lang,
	}
	var options = {
		url: baseURL+'/search',
		qs: query
	}
	request(options, function(err, res, body){
		if(err) console.log(err);
		parser
		 .parseString(body, function(err, result) {

		})

	})
}

export.requestByView = function (t_code, lang) {
	var query = {
		key: myAPIkey,
		method: 'target_code',
		q: t_code,
		trans_lang: lang
	}
	var options = {
		url: baseURL+'/view',
		qs: query
	}
	request(options, function(err, res, body){
		if(err) console.log(err);
	})
}