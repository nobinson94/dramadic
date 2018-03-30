const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const crypto = require('crypto');

let db = require(__DBdir);

exports.setup = function (passport) {
  passport.serializeUser(function(session, done) {
    done(null, session);
  });

  passport.deserializeUser(function(session, done) {
    //console.log('deserialize');
    done(null, session);
  });

  passport.use(new LocalStrategy({
  		usernameField: 'email',
  		passwordField: 'password',
  	},
  	function(email, password, done) {

  		let user_email	= mysql.escape(email);
      let user_pw = mysql.escape(password);
  		let conn;

  		db.getConnection()
  		.then((connection) => {
  			conn = connection;

  			let sql = `
  				SELECT *
  				FROM USER_INFO_TB
  				WHERE USER_ID = ${user_email}
  			`;

  			return conn.query(sql);
  		})
  		.then((sql_result) => {
  			if(sql_result.length > 0) {
  				let pw = sql_result[0]['USER_PW'];
  				let salt = sql_result[0]['SALT'];

  				var userHashPass = crypto.createHash("sha512").update(password + salt).digest("hex").toString();
         
  				if(userHashPass === pw) {
  					let session = {
                	'USER_ID' : sql_result[0]['USER_ID'],
                	'USER_NAME' : sql_result[0]['USER_NAME'],
                	};

              		conn.query(`UPDATE USER_INFO_TB SET RECENT_LOGIN_DT = now() WHERE USER_ID = '${sql_result[0]['USER_ID']}'`);
              		db.releaseConnection(conn);
             		return done(null, session);
  				} else {
  					db.releaseConnection(conn);
  					return done(null, false, {message: 'fail to login'});
  				}
  			} else {
  				db.releaseConnection(conn);
  				return done(null, false, {message: 'fail to login'});
  			}
  		})
  	}
  ))
}