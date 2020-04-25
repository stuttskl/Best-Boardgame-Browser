let mysql = require('mysql');
let pool = mysql.createConnection({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_stuttsk',
    //password: '',
    database: 'cs340_stuttsk'
});

pool.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

module.exports.pool = pool;
