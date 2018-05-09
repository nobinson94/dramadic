var express = require('express');
var mysql = require('mysql');

var router = express.Router();
let db = require(__DBdir);
let conn;

router.get('/:videoid', function(req, res, next) {
	let videoid = parseInt(req.params.videoid);
	let start = parseInt(req.query.start);

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
		
		for(script of scriptList) {
			if(script.keywords === null) {
				script.keywords = [];
			} else {
				let len = script.keywords.length;
				let tempArr = script.keywords.substr(1, len-2);
				tempArr = tempArr.split(")(");
				script.keywords = tempArr;
			}
			script.keyword = '';
		}
		conn.release();
		console.log(scriptList);
		res.send(scriptList);
	});

});

module.exports = router;

