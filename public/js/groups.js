module.exports = function () {
	var express = require('express');
	var router = express.Router();
	var async = require('async');

  // function getGroups(res, mysql, context, complete) {
  //   mysql.pool.query("SELECT id, group_name FROM groups", function (err, results) {
  //     if (err) {
  //       res.write(JSON.stringify(err));
  //       res.end();
  //     }
  //     context.groups = results;
  //     complete();
  //   });
  // };

	function getAllGroups(mysql) {
		return function(callback) {
			mysql.pool.query('SELECT id, group_name FROM groups;', function(err, data1) {
				if (err) {
					return callback(err, []);
				}
				return callback(null, data1);
			});
		}
	}

	function getAllPlayers(mysql) {
		return function(callback) {
			mysql.pool.query('SELECT id, first_name, last_name, img FROM players;', function(err, data1) {
				if (err) {
					return callback(err, []);
				}
				return callback(null, data1);
			});
		}
	}

	function searchForPlayers(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT * FROM players JOIN player_groups ON player_id = players.id WHERE group_id = " + req.query.seePlayersID;
		console.log(query)
		mysql.pool.query(query, function (err, results) {
			if (err) {
				res.write(JSON.stringify(err));
				res.end();
			}
			context.players = results;
			complete();
		});
	};

	router.get('/seePlayers', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');

		searchForPlayers(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('players', context);
			};
		};
	});
//////////
function searchForGames(req, res, mysql, context, complete) {
	//sanitize the input as well as include the % character
	var query = "SELECT * FROM games JOIN player_games ON game_id = games.id JOIN player_groups ON player_groups.player_id = player_games.player_id WHERE group_id = " + req.query.seeGGID;
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

router.get('/seeGroupGames', function (req, res) {
	var callbackCount = 0;
	var context = {};
	var mysql = req.app.get('mysql');

	searchForGames(req, res, mysql, context, complete);
	function complete() {
		callbackCount++;
		if (callbackCount >= 1) {
			res.render('games', context);
		};
	};
});


///////////
	router.post('/addGroupPlayer', function (req, res) {
		// console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO player_groups (`player_id`, `group_id`) VALUES (?, ?)";
		var inserts = [req.body.player_selection2, req.body.group_selection];
		sql = mysql.pool.query(sql, inserts, function (err) {
				if (err) {
						console.log(JSON.stringify(err))
						res.write(JSON.stringify(err));
						res.end();
				} else {
						res.redirect('/groups');
				}
		});
});

	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, group_name FROM groups WHERE " + req.query.filter + " LIKE " + mysql.pool.escape(req.query.search + '%');
		console.log(query)
		mysql.pool.query(query, function (err, results) {
			if (err) {
				res.write(JSON.stringify(err));
				res.end();
			}
			context.groups = results;
			complete();
		});
	};

	router.get('/', function (req, res) {
		var mysql = req.app.get('mysql');
    async.parallel(
      {
        players: getAllPlayers(mysql),
        groups: getAllGroups(mysql)
      },
      function(err, results) {
        if (err) {
          console.log(err.message);
        }
        res.render('groups', results); // { players: [], games: [] }
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
				res.render('groups', context);
			};
		};
	});

	router.post('/add', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO groups (`group_name`) VALUES (?)";
		var inserts = [req.body.new_group_name];
		sql = mysql.pool.query(sql, inserts, function (err, results) {
			if (err) {
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/groups');
			}
		});
	});

	router.post('/update', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "UPDATE groups SET group_name = ? WHERE id = ?";
		var inserts = [req.body.editGroupName, req.body.updateID];
		sql = mysql.pool.query(sql, inserts, function (err, results) {
			if (err) {
				console.log(JSON.stringify(err))
				res.write(JSON.stringify(err));
				res.end();
			} else {
				res.redirect('/groups');
			}
		});
	});

	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM groups WHERE id = ?";
		var inserts = [req.body.deleteGroupID];
		sql = mysql.pool.query(sql, inserts, function (err, results) {
			if (err) {
				console.log(err)
				res.write(JSON.stringify(err));
				res.status(400);
				res.end();
			} else {
				res.redirect('/groups');
			}
		});
	});
	return router;
}();
