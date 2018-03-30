var express = require('express');
var mysql = require('mysql');
var fs = require('fs');

var router = express.Router();
let db = require(__DBdir);

const subtitle = fs.readFileSync('subtitle.txt');

lineArray = subtitle.toString().split('\n');

router.get('/', function(req, res, next) {
	
	let scriptNumArray = [];
	let startTimeArray = [];
	let endTimeArray = [];
	let textArray = [];

	var arrTemp;
	var length = lineArray.length;
	var vals = "";
	var num = 1;
	var line;
	var temp;

	for (var i = 0; i < length; i++) {
		if(lineArray[i].trim() == num) {
			vals += "(";
			vals += "'3','";
			vals += lineArray[i].trim();
			vals += "',";
			line = 0;
			num++;
		} else if (line == 1) {
			temp = lineArray[i].split('-->');
			temp[0] = temp[0].replace(',','/');
			temp[1] = temp[1].replace(',','/');
			vals += "'";
			vals += temp[0].trim();
			vals += "','";
			vals += temp[1].trim();
			vals += "','";
		} else {
			temp = lineArray[i].replace(/\r/gi,"");
			temp = temp.replace(/\'/gi,`"`);
			temp = temp.replace(/\t/gi, "");
			if (temp.length == 0) {
				vals += "')";
				if(i != length-1) vals += ",";
			} else {
				if (line == 2) {
					vals += temp;
				} else {
					vals += " ";
					vals += temp;
				}

			}
		}
		line++;
	}
	db.getConnection()
	.then((connection) => {
		let sql = `
			INSERT INTO	SCRIPT_TB (Video_id, script_num, Start_time, End_time, text)
			VALUES ${vals}
		`;
		//VALUES ${vals}
		return connection.query(sql, (error, results, fields) => {
			if(error) console.log(error);
			db.releaseConnection(connection);
			res.send(sql);
		});

	})
});

module.exports = router;