'use strict'

const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const shelljs = require('shelljs');

const router = express.Router();
const db = require(__DBdir);

router.get('/:videoid', function(req, res, next) {

	let videoid = req.params.videoid;
	let resultClips = [];
	let origin = null;

	db.getConnection()
	.then((conn) => {
		let sql = `
			SELECT MIN(ST.Start_time) as stime, MAX(ST.End_time) as etime, ST.sentence_id as id, VT.VIDEO_path as path
			FROM SCRIPT_TB AS ST
			JOIN VIDEO_TB AS VT
			WHERE ST.Video_id = VT.INDEX and ST.Video_id = ${videoid} and ST.sentence_id IS NOT NULL
			GROUP BY ST.sentence_id
			ORDER BY ST.sentence_id
			`
		return conn.query(sql);
	}).then((sql_result) => {
		
		for(let i = 0; i < sql_result.length; i++) {
			let stime = (i===0) 
			? sql_result[0].stime.split('/') 
			: sql_result[i-1].stime.split('/');
			let etime = (i===sql_result.length-1) 
			? sql_result[i].etime.split('/') 
			: sql_result[i+1].etime.split('/');
			let dur = encodeSec(etime[0]) - encodeSec(stime[0]);
			let data = {
				"startTime": stime[0],
				"duration": decodeSec(dur),
				"originFileName": './'+sql_result[i].path,
				"clipFileName": './'+sql_result[i].path.split('.')[0]+'_'+sql_result[i].id+'.mp4'
			}
			resultClips.push(data);
		}
		return makeClip(resultClips);
	});
});

module.exports = router;

function encodeSec(hhmmdd) {
	let time = hhmmdd.split(":");
	let hours   = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let seconds = parseInt(time[2]);

   	let sec = hours*3600 + minutes*60 + seconds;

   	return sec;
}
function decodeSec(sec) {

    var hours   = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (hours * 3600)) / 60);
    var seconds = sec - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
function makeClip(results) {
	let cutPromises = results.map((cut) => {
		return cutVideo({
			startTime: cut.startTime,
			duration: cut.duration,
			originFileName: cut.originFileName,
			clipFileName: cut.clipFileName
		});
	});
	return Promise.all(cutPromises);
}
function cutVideo(args) {

	  return new Promise((resolve, reject) => {

	    let commandQuery =
	      `ffmpeg -i ${args.originFileName} -ss ${args.startTime} -t ${args.duration} ${args.clipFileName} -y`;
	    let child = shelljs.exec(commandQuery, { async: false, silent: false });

	    child.on('exit', (code, signal) => {

	      if (code === 0) {
	        resolve({
	        	startTime: args.startTime,
	        	duration: args.duration,
	        	fileName: args.clipFileName,
	        });
	      } else {
	        reject({ err: { code: code, signal: signal } });
	      }
	    });
	});
}


