var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var tmp = require('tmp');
var shelljs = require('shelljs');

var router = express.Router();
let db = require(__DBdir);

router.get('/:videoid/scriptnum/:scriptnum', function(req, res, next) {
	
	let videoid = parseInt(req.params.videoid);
	let scriptnum = parseInt(req.params.scriptnum);
	
	db
	.getConnection()
	.then((connection) => {
		let sql = `
			SELECT ST.*, VT.*
			FROM SCRIPT_TB AS ST
			JOIN VIDEO_TB AS VT
			WHERE ST.Video_id = VT.INDEX and ST.Video_id = ${videoid} and ST.script_num = ${scriptnum}
		`;
			return connection.query(sql);
		}).then((sql_result) => {
			console.log(sql_result);
			var data = {
			'id': '',
			'main_title': '',
			'sub_title': '',
			'path': '',
			'category': '',
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

router.get('/path/:videopath', async function(req, res, next) {

	let videopath = req.params.videopath;
	let path = "http://d1m31uchl59ope.cloudfront.net/" + videopath;
	let start = "00:01:00";
	let duration = "00:00:30";
	var videoData = {
		filePath: path,
		startTime: start,
		duration: duration,
	}
	var video = await cutVideo(videoData);
	const stat = fs.statSync(video.path);
  	const fileSize = stat.size;
  	const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head);
	const file = fs.createWriteStream(video.path);
	file.pipe(res);
});

function cutVideo(args) {
	let outputFile = tmp.tmpNameSync({
		postfix: `.mp4`
	});
	return new Promise((resolve, reject)=>{
		let query =
			`ffmpeg -i ${args.filePath} -ss ${args.startTime} -t ${args.duration} ${outputFile} -y`;

		let child = shelljs.exec(query, { async: true, silent: false });
		child.on('exit' ,(code, signal) => {
			if(code===0){
				resolve({
					path: outputFile,
				});
			} else {
				reject({
					err: 'error'
				});
			}
		})
	
	})
}

module.exports = router;