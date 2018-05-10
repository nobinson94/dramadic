var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var request = require('request');

var router = express.Router();
let db = require(__DBdir);
let conn;
router.get('/:videoid', function(req, res, next) {
	let videoid = parseInt(req.params.videoid);

	db.getConnection()
	.then((connection) => {
		conn = connection;

		let sql = `
		SELECT *
		FROM VIDEO_TB
		WHERE VIDEO_INDEX = ${videoid}
		`;

		return conn.query(sql);
	}).then((sql_result) => {
		console.log(sql_result[0]);
		conn.release();
		res.send(sql_result[0]);
	});
});
router.get('/list/title/:title', function(req, res, next) {
	let start = parseInt(req.query.start);
	let title = req.params.title.trim();
	db.getConnection()
	.then((connection) => {
		conn = connection;
		let sql = `
		SELECT *
		FROM VIDEO_TB
		WHERE CONCAT(VIDEO_Main_Title, ' ', VIDEO_Sub_Title) LIKE '%${title}%'
		LIMIT ${start}, 10
		`;
		return conn.query(sql);
	})
	.then((sql_result) => {
		conn.release();
		res.send(sql_result);
	})
});
router.get('/list/all', function(req, res, next) {

	let start = parseInt(req.query.start);
	
	db.getConnection()
	.then((connection) => {
		conn = connection;

		let sql = `
		SELECT *
		FROM VIDEO_TB
		LIMIT ${start}, 10
		`;
		
		return conn.query(sql);
	})
	.then((sql_result) => {
		console.log(sql_result);
		res.send(sql_result);
	})
});

router.get('/list/category/:category', function(req,res,next) {
	let start = parseInt(req.query.start);
	let cate = req.params.category.trim();
	console.log(cate);
	db.getConnection()
	.then((connection) => {
		conn = connection;

		let sql = `
		SELECT *
		FROM VIDEO_TB
		WHERE VIDEO_Category = '${cate}'
		LIMIT ${start}, 10
		`;

		return conn.query(sql);
	})
	.then((sql_result) => {
		conn.release();
		res.send(sql_result);
	})
});
router.get('/num/includeWord/:word', function(req, res, next) {
	let word = "("+req.params.word+")";

	db.getConnection()
	.then((connection)=> {
		conn = connection;
		let sql = `
		SELECT COUNT(*) AS num
		FROM SCRIPT_TB 
		WHERE keywords LIKE '%${word}%'
		`;
		return conn.query(sql);
	}).then((sql_result) => {
		let data = sql_result[0].num;
		conn.release();
		res.send({num: data});
	})
});
router.get('/includeWord/:word', function(req, res, next) {
	let word = "("+req.params.word+")";
	let start = parseInt(req.query.start);
	let data = [];

	db.getConnection()
	.then((connection) => {
		conn = connection;

		let sql = `
		SELECT ST.*, VT.*
		FROM SCRIPT_TB AS ST
		JOIN VIDEO_TB AS VT
		WHERE ST.video_id = VT.VIDEO_INDEX and ST.keywords LIKE '%${word}%'
		LIMIT ${start}, 4
		`;

		return conn.query(sql);
	}).then((sql_result)=> {
		var result = sql_result;
		for(var i = 0; i < result.length; i++) {
			var item = {
			'video_id': '',
			'main_title': '',
			'sub_title': '',
			'path': '',
			'script_num': '',
			'text': '',
			}
			item.video_id = result[i].Video_id;
			item.main_title = result[i].VIDEO_Main_Title;
			item.sub_title = result[i].VIDEO_Sub_Title;
			item.path = 'http://dramadicbucket.s3.amazonaws.com/' + result[i].VIDEO_Path + '_' + result[i].sentence_id +'.mp4';;
			item.script_num = result[i].script_num;
			item.text = result[i].text;
			data.push(item);
		}
		res.send(data);
	});
});

router.get('/:videoid/scriptnum/:scriptnum', function(req, res, next) {

	let videoid = parseInt(req.params.videoid);
	let scriptnum = parseInt(req.params.scriptnum);
	let data = null;
	let lastSentence;
	db
	.getConnection()
	.then((connection) => {
			conn = connection;
			let sql = `
				SELECT MAX(sentence_id)
				FROM SCRIPT_TB
				WHERE Video_id = ${videoid}
			`;
			return conn.query(sql);
		}).then((sql_result) => {
			console.log(sql_result);
			let result = sql_result[0]; 
			lastSentence = result['MAX(sentence_id)'];
			let sql = `
				SELECT ST.*, VT.*
				FROM SCRIPT_TB AS ST
				JOIN VIDEO_TB AS VT
				WHERE ST.Video_id = VT.VIDEO_INDEX and ST.Video_id = ${videoid} and ST.script_num = ${scriptnum}
			`;
			return conn.query(sql);
		}).then((sql_result) => {
			console.log(sql_result);
			var result = sql_result;
			data = {
			'id': result[0].Video_id,
			'main_title': result[0].VIDEO_Main_Title,
			'sub_title': result[0].VIDEO_Sub_Title,
			'path': result[0].VIDEO_Path + '_' + result[0].sentence_id +'.mp4',
			'script_num': result[0].script_num,
			'text': result[0].text,
			'keyword': result[0].keyword,
			'sentence_id': result[0].sentence_id,
			'sentence': '',
			}
			let sentence_cond = `(sentence_id = ${data.sentence_id} or`;
			if(data.sentence_id===1) {
				sentence_cond += ` sentence_id = ${data.sentence_id+1} or sentence_id = ${data.sentence_id+2})`;
			} else if(data.sentence_id=== lastSentence) {
				sentence_cond += ` sentence_id = ${data.sentence_id-1} or sentence_id = ${data.sentence_id-2})`;
			} else {
				sentence_cond += ` sentence_id = ${data.sentence_id+1} or sentence_id = ${data.sentence_id-1})`;
			}
			let sql = `
				SELECT text, Start_time, End_time
				FROM SCRIPT_TB
				WHERE ${sentence_cond} and Video_id = ${videoid}
			`;
			return conn.query(sql);
		}).then((sql_result)=>{
			let st = encodeSec(sql_result[0].Start_time);
			data.sentence = sql_result.map((result)=>{
				return {
					text: result.text,
					stime: encodeSec(result.Start_time),
					etime: encodeSec(result.End_time)
				}
			});
			console.log(data);
			conn.release();
			res.send(data);
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