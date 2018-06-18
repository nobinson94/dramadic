var mysql = require('promise-mysql');
var pool = mysql.createPool({
    connectionLimit: 1000,
    host: 'aws-yongtae-db.cfukszmansf6.ap-northeast-2.rds.amazonaws.com',
    user: 'nobinson94',
    database: 'dramadic_db',
    password: 'totoro12'
});

module.exports = pool;
