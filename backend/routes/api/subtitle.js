var express = require('express');
var mysql = require('mysql');

var router = express.Router();
let db = require(__DBdir);
let conn;

router.get('/:videonum', function(res, req, next) {
	videoid = req.params.videonum;

});

module.exports = router;

