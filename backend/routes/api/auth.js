var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var passport = require('passport');

var router = express.Router();
let db = require(__DBdir);

router.post('/signup', function(req, res, next) {
	let post_data = req.body;
	let user_info = post_data['user_info'];
	
	let salt = Math.round((new Date().valueOf() * Math.random())).toString() + "";
  	let hashpass = crypto.createHash("sha512").update(user_info.password + salt).digest("hex").toString();
	
	let users = {
    'email' : mysql.escape(user_info.email.trim()),
    'pwd' : mysql.escape(hashpass),
    'salt' : mysql.escape(salt),
    'name' : mysql.escape(user_info.name.trim()),
    'address' : mysql.escape(user_info.address),
  	};

	db.getConnection()
	.then((connection) => {
		let sql = `
			INSERT INTO USER_INFO_TB (USER_ID, USER_PW, SALT, USER_NAME, USER_ADDRESS, CREATE_DT, RECENT_LOGIN_DT)
			VALUES (${users['email']}, ${users['pwd']}, ${users['salt']}, ${users['name']}, ${users['address']}, now(), now() )
		`;
		
		return connection.query(sql, (error, results, fields) => {
			if (error) res.send(`${error.errno}`);
			db.releaseConnection(connection);
			res.send('0'); //회원가입 성공
		});
	});
});

router.post('/checkduplicate', function(req, res, next) {
	
	let post_data = req.body;
	let email = post_data['id'];
	
	db.getConnection()
	.then((connection) => {
		let sql = `
			SELECT *
			FROM USER_INFO_TB
			WHERE USER_ID = '${email}'
		`
		console.log(sql);
		return connection.query(sql);
	})
	.then((sql_result) => {
		res.send(sql_result);
	});
});

router.post('/login', function(req, res, next) {

	let post_data = req.body;
	console.log(post_data);

	passport.authenticate('local', function (err, user, info) {

    var error = err || info;
    if (error) return res.redirect('/');
    if (!user) return res.redirect('/');

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user);
    });

  })(req, res, next);
});

router.post('/logout', function(req, res, next) {
	req.logOut();
  	req.session.destroy(function (err) {
    	res.send("0");
  });
})

module.exports = router;
