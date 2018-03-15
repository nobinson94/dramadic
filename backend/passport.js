const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const crypto = require('crypto');

let db = require(__DBdir);

exports.setup = function (passport) {
  passport.serializeUser(function(session, done) {
    //console.log('serialize');
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

  		let user_id	= mysql.escape(email);
  		let user_pw = mysql.escape(password);
  		
  		db.getConnection()
  		.then((connection) => {
  			let sql = `
  				SELECT *
  				FROM user_info
  				WHERE user_id = ${user_id}
  			`;

  			return connection.query(sql);
  		})
  		.then((sql_result) => {
  			if(sql_result.length < 0) {
  				let pw = sql_result[0]['user_pw'];
  				let salt = sql_result[0]['salt'];

  				var userHashPass = crypto.createHash("sha512").update(password + salt).digest("hex");
  				
  				if(userHashPass === pw) {
  					let session = {
                	'USER_ID' : sql_result[0]['user_id'],
                	'USER_NAME' : sql_result[0]['user_name'],
                	};

              		connection.query(`UPDATE user_info SET recent_login = now() WHERE user_id = '${sql_result[0]['user_id']}'`);
              		db.releaseConnection(connection);
             		return done(null, session);
  				} else {
  					db.releaseConnection(connection);
  					return done(null, false, {message: 'fail to login'});
  				}
  			} else {
  				db.releaseConnection(connection);
  				return done(null, false, {message: 'fail to login'});
  			}
  		})
  	}
  ))
}