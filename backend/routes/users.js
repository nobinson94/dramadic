var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let db = require(__DBdir);

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.getConnection()
	.then((connection) => {
		let sql = `
			SELECT * 
			FROM user_info
		`;
		return connection.query(sql);
	})
	.then((sql_result) => {
		res.send(sql_result);
	});
});

module.exports = router;
