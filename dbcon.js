let mysql = require('mysql');
let pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'boardgame_db'
});

pool.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

module.exports.pool = pool;