var express = require('express');
var mysql = require('mysql');

var router = express.Router();
let db = require(__DBdir);

router.get('/:videoid/:scriptnum', function(req, res, next) {
	
	let videoid = parseInt(req.params.videoid);
	let scriptnum = parseInt(req.params.scriptnum);
	db.getConnection()
	.then((connection) => {
		let sql = `
			SELECT ST.*, VT.*
			FROM SCRIPT_TB AS ST
			JOIN VIDEO_TB AS VT
			WHERE ST.Video_id = VT.INDEX and ST.Video_id = ${videoid} and ST.script_num = ${scriptnum}
		`;
			console.log(sql);
			return connection.query(sql);
		}).then((sql_result) => {
			var data = {
			'video_id': '',
			'video_main_title': '',
			'video_sub_title': '',
			'video_path': '',
			'video_category': '',
			'script_num': '',
			'starttime':'',
			'endtime': '',
			'text': '',
			}
			var result = sql_result;

			data.id = result[0].Video_id;
			data.main_title = result[0].VIDEO_Main_Title;
			data.sub_title = result[0].VIDEO_Sub_Title;
			data.path = result[0].VIDEO_Path;
			data.category = result[0].VIDEO_Category;
			data.script_num = result[0].script_num;
			data.starttime = result[0].Start_time;
			data.endtime = result[0].End_time;
			data.text = result[0].text;
			
			res.send(data);
		});
});

module.exports = router;