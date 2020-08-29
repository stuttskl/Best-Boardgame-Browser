module.exports = function () {
	var express = require('express');
	var router = express.Router();
  var async = require('async');

  function getAllPlayers(mysql) {
    return function(callback) {
      mysql.pool.query('SELECT id, first_name, last_name FROM players;', function(err, data1) {
        if (err) {
          return callback(err, []);
        }
        return callback(null, data1);
      });
    }
  }

  function getAllGames(mysql) {
    return function(callback) {
      mysql.pool.query('SELECT id, game_name, max_players, min_players FROM games;', function(err, data2) {
        if (err) {
          return callback(err, []);
        }
        return callback(null, data2);
      });
    }
  }

	router.post('/addPlayerGame', function (req, res) {
		// console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO player_games (`player_id`, `game_id`) VALUES (?, ?)";
		var inserts = [req.body.player_selection, req.body.game_selection];
		sql = mysql.pool.query(sql, inserts, function (err) {
				if (err) {
						console.log(JSON.stringify(err))
						res.write(JSON.stringify(err));
						res.end();
				} else {
						res.redirect('/players');
				}
		});
  });

	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, first_name, last_name FROM players WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
		mysql.pool.query(query, function (err, results) {
			if (err) {
				res.write(JSON.stringify(err));
				res.end();
			}
        context.players = results;
			complete();
		});
	};

	function searchPlayerGames(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT * FROM games JOIN player_games ON game_id = games.id WHERE player_id = " + req.query.seePlayerGID;
		console.log(query)
		mysql.pool.query(query, function (err, results) {
			if (err) {
				res.write(JSON.stringify(err));
				res.end();
			}
			context.games = results;
			complete();
		});
	};

	router.get('/seePlayerGames', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');

		searchPlayerGames(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('games', context);
			};
		};
	});

	router.get('/', function (req, res) {
		var mysql = req.app.get('mysql');
    async.parallel(
      {
        players: getAllPlayers(mysql),
        games: getAllGames(mysql)
      },
      function(err, results) {
        if (err) {
          console.log(err.message);
        }
        res.render('players', results); // { players: [], games: [] }
      }
    );
	});

	router.get('/search', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');

		searchFunction(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('players', context);
			};
		};
	});

	router.post('/add', function (req, res) {
		// console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO players (`first_name`, `last_name`) VALUES (?, ?)";
		var inserts = [req.body.new_first_name, req.body.new_last_name];
		sql = mysql.pool.query(sql, inserts, function (err) {
			if (err) {
				console.log(JSON.stringify(err))
				res.write(JSON.stringify(err));
				res.end();
			} else {
				res.redirect('/players');
			}
		});
	});

	router.post('/update', function (req, res) {
		// console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "UPDATE players SET first_name = ?, last_name= ? WHERE id = ?";
		var inserts = [req.body.editFirstName, req.body.editLastName, req.body.updateID];
		sql = mysql.pool.query(sql, inserts, function (err) {
			if (err) {
				console.log(JSON.stringify(err))
				res.write(JSON.stringify(err));
				res.end();
			} else {
				res.redirect('/players');
			}
		});
	});

	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM players WHERE id = ?";
		var inserts = [req.body.deleteID];
		sql = mysql.pool.query(sql, inserts, function (err) {
			if (err) {
				console.log(err)
				res.write(JSON.stringify(err));
				res.status(400);
				res.end();
			} else {
				res.redirect('/players');
			}
		});
	});
	return router;
}();
