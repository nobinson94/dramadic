var express = require('express');
var mysql = require('mysql');
var urlencode = require('urlencode');

var router = express.Router();
let db = require(__DBdir);


router.post('/', function(req, res, next) {
	let post_data = req.body;
	let email = post_data['id'];
	let conn;

	db.getConnection()
	.then((connection) => {
		conn = connection;
		let sql = `
			SELECT *
			FROM USER_INFO_TB
			WHERE USER_ID = '${email}'
		`;

		return connection.query(sql);

	}).then((sql_result) => {
		let user_data = {
			id: sql_result[0].USER_ID,
			name: sql_result[0].USER_NAME,
			address : sql_result[0].USER_ADDRESS,
			lang : sql_result[0].default_lang,
			phone: sql_result[0].USER_PHONE,
			level: sql_result[0].USER_LEVEL, 
		}
		if (user_data.lang === null) user_data.lang = 1;
		conn.release();
		res.send(user_data);
	});
})

module.exports = router;