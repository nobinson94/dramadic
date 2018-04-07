var express = require('express');
var mysql = require('mysql');
var xml2js = require('xml2js');
var request = require('request');
var urlencode = require('urlencode');

var router = express.Router();
let db = require(__DBdir);

router.get('/videos/:word', function(req,res,next) {
	let conn;
	let word = req.params.word;
	var data = new Array;

	db.getConnection()
	.then((connection) => {
		conn = connection;

		let sql = `
		SELECT ST.*, VT.*
		FROM SCRIPT_TB AS ST
		JOIN VIDEO_TB AS VT
		WHERE ST.video_id = VT.INDEX and ST.text LIKE '%${word}%'
		`;

		return conn.query(sql);
	}).then((sql_result)=> {
		var result = sql_result;
		for(var i = 0; i < result.length; i++) {
			var item = {
			'id': '',
			'main_title': '',
			'sub_title': '',
			'path': '',
			'category': '',
			'script_num': '',
			'start_t':'',
			'end_t': '',
			'text': '',
			}
			item.id = result[i].Video_id;
			item.main_title = result[i].VIDEO_Main_Title;
			item.sub_title = result[i].VIDEO_Sub_Title;
			item.path = result[i].VIDEO_Path;
			item.category = result[i].VIDEO_Category;
			item.script_num = result[i].script_num;
			item.start_t = result[i].Start_time;
			item.end_t = result[i].End_time;
			item.text = result[i].text;
			data.push(item);
		}
		db.releaseConnection(conn);
		res.send(data);
	});
	
});

let searchWord = (word, lang) => new Promise((resolve) => {
	var parser = new xml2js.Parser();
	var data = [];
	var url = "https://krdict.korean.go.kr/api/search?certkey_no=239&key=D393C1F077CF383BB7CDE21F07BE0ADD&type_search=search&method=WORD_INFO&part=word&";
	url += "q=";
	url += urlencode(word);
	url += "&sort=popular&translated=y&";
	url += "trans_lang=";
	url += lang;

	console.log(url);
	request(url, function(error, response, body) {
       	parser.parseString(body, function(err, result){
       		if(result.channel.total[0] !== '0') {
       			var worditems = result.channel.item;
	       		for(let item of worditems) {
	       			data.push({
	       				code: item.target_code[0], //target_code
		       			name: item.word[0],
		       			index: item.sup_no[0], // 동형어 넘버 
		       			pos: item.pos[0], // 품사 
		       			senses: item.sense
		       		});
	       		}
				resolve(data); 		
       		}
       	});
    });
});

async function searchLoop(wordSplit, lang) {
	var dataArr = [];
	for(let splitted of wordSplit) {
		let data = await searchWord(splitted, lang);
		dataArr = dataArr.concat(data);
	}
	return dataArr;
}

router.get('/words/:word/lang/:langnum', async function (req, res, next) {	
	let lang = req.params.langnum;
	let word = req.params.word;
	word.trim();
	var wordSplit = word.split(' ');
	var result = await searchLoop(wordSplit, lang);
	
	console.log(result);
	res.send(result);
})


module.exports = router;