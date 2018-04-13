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
    'lang': mysql.escape(user_info.lang),
    'phone': mysql.escape(user_info.phone),
  	};

	db.getConnection()
	.then((connection) => {
		let sql = `
			INSERT INTO USER_INFO_TB (USER_ID, USER_PW, SALT, USER_NAME, USER_ADDRESS, CREATE_DT, RECENT_LOGIN_DT, USER_PHONE, default_lang)
			VALUES (${users['email']}, ${users['pwd']}, ${users['salt']}, ${users['name']}, ${users['address']}, now(), now(),${users['phone']},${users['lang']} )
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
  //  패스포트 모듈로 인증 시도
  passport.authenticate('local', function (err, user, info) {

    if (err) return res.send('error');
    if (info == '1') return res.send('1'); //비밀번호가 틀린 에러
    if (info == '2') return res.send('2'); // 아이디가 틀린 에러 
    if (!user) return res.send('!user');

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
