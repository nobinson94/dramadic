var express = require('express');
var mysql = require('mysql');

var router = express.Router();
let db = require(__DBdir);

router.get('/:videoid', function(req, res, next) {
	let videoid = parseInt(req.params.videoid);
	let start = parseInt(req.query.start);
	let conn;

	db.getConnection()
	.then((connection)=>{
		conn = connection;

		let sql = `
		SELECT *
		FROM SCRIPT_TB
		WHERE Video_id = ${videoid}
		LIMIT ${start}, 100
		`;

		return conn.query(sql);

	}).then((sql_result) => {
		let scriptList = sql_result;
		let returnDataArray = [];

		for(script of scriptList) {
			let returnData = {
				eTime: '',
				sTime: '',
				keywords: [],
				keyword: '',
				text: '',
				scriptNum: '',
				sentenceNum: '',
			}
			let tempEndTime = script.End_time.split('/');
			returnData.eTime = tempEndTime[0];
			let tempStartTime = script.Start_time.split('/');
			returnData.sTime = tempStartTime[0];
			returnData.text = script.text.trim();
			returnData.scriptNum = script.script_num;
			returnData.sentenceNum = script.sentence_id;
			if(script.keywords === null || script.keywords.trim() === '') {
				returnData.keywords = [];
			} else {
				let len = script.keywords.length;
				let tempArr = script.keywords.substr(1, len-2);
				tempArr = tempArr.split(")(");
				returnData.keywords = tempArr.map(function(value, index) {
					return {
						text: value
					}
				});
			}
			returnDataArray.push(returnData);
		}
		conn.release();
		console.log(returnDataArray);
		res.send(returnDataArray);
	});

});

module.exports = router;

