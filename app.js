var express = require('express');
var mysql = require('./dbcon.js');
var morgan = require('morgan');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8000);

app.get('/', function (req, res, next) {
    res.render('home');
});

// PLAYER ROUTES

app.get('/players', function (req, res, next) {
    mysql.pool.query('SELECT * FROM players', (err, rows) => {
        if(err) {
            next(err); return;
        }
        // res.send({data:rows});
        res.render('players', {data: rows});
    });
});

app.get('/player_add', function (req, res, next) {
    mysql.pool.query('SELECT * FROM players', (err, rows) => {
        if(err) {
            next(err); return;
        }
        // res.send({data:rows});
        res.render('player_add', {data: rows});
    });
});

app.get('/player_addGame', function (req, res, next) {
    mysql.pool.query('SELECT * FROM players', (err, rows) => {
        if(err) {
            next(err); return;
        }
        // res.send({data:rows});
        res.render('player_addGame', {data: rows});
    });
});

app.get('/player_lookup', function (req, res, next) {
    mysql.pool.query('SELECT first_name, last_name FROM players')
    res.render('player_lookup');
});

app.get('/games', function (req, res, next) {
    mysql.pool.query('SELECT * FROM games', (err, rows) => {
        if(err) {
            next(err); return;
        }
        // res.send({data:rows});
        res.render('games', {data: rows});
    });
});

// GROUP ROUTES

app.get('/groups', function (req, res, next) {
    mysql.pool.query('SELECT * FROM `groups`', (err, rows) => {
        if(err) {
            next(err); return;
        }
        // res.send({data:rows});
        res.render('groups', {data: rows});
    });
});

app.get('/group_addPlayer', function (req, res, next) {
    res.render('group_addPlayer');
});

app.get('/group_create', function (req, res, next) {
    res.render('group_create');
});

app.get('/group_lookup', function (req, res, next) {
    res.render('group_lookup');
});

// View whole table with get
app.get('/get-player-table', function(req, res, next) {
    console.log("in get-table");
    var sql = "SELECT * FROM players";
    var context = {};
    mysql.pool.query(sql, function(err, rows) {
        if(err) {
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.type("application/json");
        res.send(rows);
    });
});

// app.post('/insert', function (req, res, next) {
//     var sql = "INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)";
// 	mysql.pool.query(sql, [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result) {
//         if(err) {
//             next(err);
//             return;
//         } else {	
//             mysql.pool.query("SELECT *, DATE_FORMAT(date, '%d-%m-%Y') as date FROM workouts", function(err, rows) {
//                 if(err) {
//                     next(err);
//                     return;
//                 }
//                 console.log(JSON.stringify(rows));    	
//                 res.type("application/json");
//                 res.send(rows);
//             })
//         };
//     });
// });

// resets table
// app.get('/reset-table',function(req, res, next) {
//     var context = {};
//     mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err) { 
//         var createString = "CREATE TABLE workouts("+
//         "id INT PRIMARY KEY AUTO_INCREMENT,"+
//         "name VARCHAR(255) NOT NULL,"+
//         "reps INT,"+
//         "weight INT,"+
//         "date DATE,"+
//         "lbs BOOLEAN)";
//         mysql.pool.query(createString, function (err) {
//             context.results = "Table reset dawg";
//             res.render('home', context);
//         });
//     });
// });

// app.get('/delete', function(req, res, next) {
//     var context = {};
//     mysql.pool.query("DELETE FROM workouts WHERE id = ?", [req.query.id], function (err, result) {
//         if (err) {
//             next(err);
//             return;
//         }
//         context.results = 'Deleted rows.';
//         res.type('text/plain');
//         res.send(res);
//         res.render('home', context);
//     });
// });

// app.get('/update/(:id)', function (req, res, next) {
//     var context= {};
//     mysql.pool.query("SELECT * FROM workouts WHERE id?", [req.query.id], function (err, result) {
//         if (err) {
//             next(err);
//             return;
//         }
//         if (result.length == 1) {
//             var curVals = result[0];
//             mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=?",
//             [req.query.name || curVals.name, req.query.reps || curVals.reps || req.query.weight || curVals.weight
//             || req.query.date || curVals.date || req.query.lbs || curVals.lbs], function(err, result) {
//                 if (err) {
//                     next(err);
//                     return;
//                 }
//                 context.results = "Updated rows.";
//                 res.render('home', context);
//             });
//         }
//     });
// });

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});
  
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

