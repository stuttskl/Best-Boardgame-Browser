module.exports = function () {
	var express = require('express');
	var router = express.Router();

  function getGroups(res, mysql, context, complete) {
    mysql.pool.query("SELECT id, group_name FROM groups", function (err, results) {
      if (err) {
        res.write(JSON.stringify(err));
        res.end();
      }
      context.groups = results;
      complete();
    });
  };

	function searchFunction(req, res, mysql, context, complete) {
		//sanitize the input as well as include the % character
		var query = "SELECT id, group_name FROM groups WHERE " + req.query.filter + " LIKE " + mysql.pool.escape('%' + req.query.search + '%');
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
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getGames(res, mysql, context, complete);
		function complete() {
			callbackCount++;
			if (callbackCount >= 1) {
				res.render('groups', context);
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
		var inserts = [req.body.deleteID];
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
