 let mysql = require('mysql');
 let pool = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'password',
     database: 'group27_test'
 });

 pool.connect(function(err) {
     if (err) {
       return console.error('error: ' + err.message);
     }
     console.log('Connected to the MySQL server.');
 });

module.exports.pool = pool;

//let mysql = require('mysql');
//let pool = mysql.createConnection({
//    host: 'classmysql.engr.oregonstate.edu',
//    user: 'cs340_stuttsk',
//    password: '7172',
//    database: 'cs340_stuttsk'
//});

//pool.connect(function(err) {
//    if (err) {
//      return console.error('error: ' + err.message);
//    }
//    console.log('Connected to the MySQL server.');
//});

//module.exports.pool = pool;
