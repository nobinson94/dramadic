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
router.get('/words/:word', function (req, res, next) {
	
	let word = req.params.word;
	var data = new Array;
	var worditem;

	var url = "https://krdict.korean.go.kr/api/search?certkey_no=239&key=D393C1F077CF383BB7CDE21F07BE0ADD&type_search=search&method=WORD_INFO&part=word&";

	url += "q=";
	url += urlencode(word);
	url += "&sort=popular&translated=y&trans_lang=1";

	var parser = new xml2js.Parser();

	request(url, function(error, response, body) {
        parser.parseString(body, function(err,result){
        		console.log(result);
        		if(result.channel.total[0] == '0') {
        			res.send('0');
        			console.log('no result');
        		} else {
        			worditems = result.channel.item;
	        		for(var i = 0; i < worditems.length; i++) {
	        			var item = {
	        			name: '',
	        			index: '',
	        			pos: '',
	        			senses: []
	        			};
	        			item.name = worditems[i].word[0];
	        			item.index = worditems[i].sup_no[0];
	        			item.pos = worditems[i].pos[0];
	        			item.senses = worditems[i].sense;
	        			data.push(item); 
	        		}
        			res.send(data);
        		}
        });
    });
})


module.exports = router;