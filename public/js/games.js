module.exports = function () {
	var express = require('express');
	var router = express.Router();

  function getGames(res, mysql, context, complete) {
    mysql.pool.query("SELECT id, game_name, max_players, min_players FROM games", function (err, results) {
      if (err) {
        res.write(JSON.stringify(err));
        res.end();
      }
      context.games = results;
      complete();
    });
  };

	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, game_name, max_players, min_players FROM games WHERE " + req.query.filter + " LIKE " + mysql.pool.escape(req.query.search + '%');
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

	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getGames(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('games', context);
			};
		};
	});

	router.get('/search', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		searchFunction(req, res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('games', context);
			};
		};
	});

	router.post('/add', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO games (`game_name`, `max_players`, `min_players`) VALUES (?, ?, ?)";
		var inserts = [req.body.new_game_name, req.body.new_max_players, req.body.new_min_players];
		sql = mysql.pool.query(sql, inserts, function (err, results) {
			if (err) {
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/games');
			}
		});
	});

	router.post('/update', function (req, res) {
		console.log(req.body)
		var mysql = req.app.get('mysql');
		var sql = "UPDATE games SET game_name = ?, max_players = ?, min_players =? WHERE id = ?";
		var inserts = [req.body.editGameName, req.body.editMaxPlayers, req.body.editMinPlayers, req.body.updateID];
		sql = mysql.pool.query(sql, inserts, function (err, results) {
			if (err) {
				console.log(JSON.stringify(err))
				res.write(JSON.stringify(err));
				res.end();
			} else {
				res.redirect('/games');
			}
		});
	});

	router.post('/delete', function (req, res) {
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM games WHERE id = ?";
		var inserts = [req.body.deleteGID];
		sql = mysql.pool.query(sql, inserts, function (err, results) {
			if (err) {
				console.log(err)
				res.write(JSON.stringify(err));
				res.status(400);
				res.end();
			} else {
				res.redirect('/games');
			}
		});
	});
	return router;
}();
