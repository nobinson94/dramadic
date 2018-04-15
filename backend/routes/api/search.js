const express = require('express');
const mysql = require('mysql');
const krdict = require('../../lib/krdict_api');
const router = express.Router();
let db = require(__DBdir);

router.get('/videolist/:targetword', function(req,res,next) {
	let conn;
	let word = req.params.targetword;
	var data = [];

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


router.get('/wordlist/:targetwords', async function (req, res, next) {

	let lang = req.query.lang;
	let words = req.params.targetwords;

	let searchData = await krdict.requestBySearch(words);
	let resultData = [];
	for(let data of searchData) {
		resultData.push(await krdict.requestByView(data.code, lang));
	}
	console.log(resultData);
	res.send(resultData);
});



module.exports = router;