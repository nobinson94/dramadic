const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const request = require('request');
const multiparty = require('multiparty');
const path = require('path');
const convertSRT = require('../../lib/convertSRT_api');

const router = express.Router();

let db = require(__DBdir);
let conn;

router.post('/tmp', function(req, res, next) {
	let form = new multiparty.Form();
	
	let returnData = {
		videoData: null,
		scriptData: null,
	}	

	let video = {
		'main_title': '',
		'sub_title': '',
		'category': ''
	}
	let script;

	form.on('field', function(name, value) {
		console.log(name +" : "+ value);
		switch(name) {
			case 'main_title': video.main_title = value; break;
			case 'sub_title': video.sub_title = value; break;
			case 'category': video.category = value; break;
		}
	})

	form.on('part', function(part) {
		let filename;
		let filesize;
		let fileext;

		if(part.filename) {
			console.log(part.filename);
			filename = part.filename;
			fileext = path.extname(filename);
			filesize = part.byteCount;
		} else {
			part.resume();
		}
		let writeStream = fs.createWriteStream('/tmp/upload/'+filename);
		writeStream.filename = filename;
        part.pipe(writeStream);

        part.on('data', function(chunk) {
            console.log(filename+'read'+chunk.length + 'bytes');
        });

		part.on('end', function() {
			writeStream.end();
			if(fileext === 'srt'){
				script = convertSRT.make('/tmp/upload/'+filename);
			}
		});		
	});

	form.on('close', function() {
		res.status(200).send('upload success');
	})

});


module.exports = router;