module.exports = function () {
	var express = require('express');
	var router = express.Router();

  function getPlayers(res, mysql, context, complete) {
    mysql.pool.query("SELECT id, first_name, last_name FROM players", function (error, results) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.player = results;
      complete();
    });
  };

	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, first_name, last_name FROM players WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
		console.log(query)
		mysql.pool.query(query, function (err, results) {
			if (err) {
				res.write(JSON.stringify(err));
				res.end();
			}
			context.player = results;
			complete();
		});
	};

	router.get('/', function (req, res) {
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getPlayers(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('players', context);
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
				res.render('players', context);
			};
		};
	});

	router.post('/add', function (req, res) {
		console.log(req.body)
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
		console.log(req.body)
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