var mysql = require('promise-mysql');
var pool = mysql.createPool({
    connectionLimit: 1000,
    host: 'dramadicdb.chjgpptkip1e.us-east-1.rds.amazonaws.com',
    user: 'admin',
    database: 'dramadic_db',
    password: 'totoro12!'
});

module.exports = pool;
