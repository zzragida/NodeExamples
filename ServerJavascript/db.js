var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: '10.30.76.13',
  port: 6606,
  database: 'm3',
  user: 'root',
  password: 'kjs2005'
});

module.exports.pool = pool;

