let mysql = require('mysql');
let pool = mysql.createConnection({
  host: 'oniddb.cws.oregonstate.edu',
  user: 'stuttsk-db',
  password: 'Hbxn7wUp9KlonQpU',
  database: 'stuttsk-db'
});

pool.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

module.exports.pool = pool;
