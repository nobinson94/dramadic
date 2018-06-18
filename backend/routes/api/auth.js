const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = express.Router();
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
    'level': 0
  	};

	db.getConnection()
	.then((connection) => {
		let sql = `
			INSERT INTO USER_INFO_TB (USER_ID, USER_PW, SALT, USER_NAME, USER_ADDRESS, CREATE_DT, RECENT_LOGIN_DT, USER_PHONE, default_lang, USER_LEVEL)
			VALUES (${users['email']}, ${users['pwd']}, ${users['salt']}, ${users['name']}, ${users['address']}, now(), now(),${users['phone']},${users['lang']}, ${users['level']} )
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
		return connection.query(sql);
	})
	.then((sql_result) => {
		res.send(sql_result);
	});
});

router.post('/login', function(req, res, next) {
	let post_data = req.body;
	let email = mysql.escape(post_data['email']);
	let password = post_data['password'];
	let conn;

	db.getConnection()
	.then((connection) => {
		conn = connection;
		let sql = `
			SELECT *
  			FROM USER_INFO_TB
  			WHERE USER_ID = ${email}
		`;

		return conn.query(sql);
	}).then((sql_result) => {
		if(sql_result.length > 0) {
			let pw = sql_result[0]['USER_PW'];
  			let salt = sql_result[0]['SALT'];
  			
  			let userHashPass = crypto.createHash("sha512").update(password + salt).digest("hex").toString();
         	
         	if(userHashPass === pw) {
  				let token = jwt.sign(
  						{
		            		id : sql_result[0]['USER_ID'],
	            		} 
	            		,'shhhh'
  				)

  				let data = {
              		'token' : token,
              		'USER_ID' : sql_result[0]['USER_ID'],
            		'USER_NAME' : sql_result[0]['USER_NAME'],
              		'lang': sql_result[0]['default_lang'],
              		'level': sql_result[0]['USER_LEVEL'],
            	};

            	conn.query(`UPDATE USER_INFO_TB SET RECENT_LOGIN_DT = now() WHERE USER_ID = '${sql_result[0]['USER_ID']}'`);
            	console.log("성공적 로그인");
            	console.log(data.token);
            	db.releaseConnection(conn);
            	res.send(data);
            	
			} else {
				//wrong password
				console.log("wrong password");
				db.releaseConnection(conn);
				res.send("1");
			}
		} else {
			//wrong email
			console.log("wrong email");
			db.releaseConnection(conn);
			res.send("2");
		}
	});
});



router.post('/logout', function(req, res, next) {
	req.logOut();
  	req.session.destroy(function (err) {
    	res.send("0");
  });
})

module.exports = router;
