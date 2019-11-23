module.exports = function () {
  var express = require('express');
  var router = express.Router();

  function getCategory(res, mysql, context, complete) {
    mysql.pool.query("SELECT id, category FROM category", function (err, results) {
      if (err) {
        res.write(JSON.stringify(err));
        res.end();
      }
      context.category = results;
      complete();
    });
  };

  function searchFunction(req, res, mysql, context, complete) {
    //sanitize the input as well as include the % character
    var query = "SELECT * FROM games JOIN game_category ON game_id = games.id WHERE category_id = " + req.query.seeGamesID;
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

router.post('/delete', function (req, res) {
   var mysql = req.app.get('mysql');
   var sql = "DELETE FROM category WHERE id = ?";
   var inserts = [req.body.deleteCategoryID];
   sql = mysql.pool.query(sql, inserts, function (err, results) {
     if (err) {
       console.log(err)
       res.write(JSON.stringify(err));
       res.status(400);
       res.end();
     } else {
       res.redirect('/category');
     }
   });
  });

  router.get('/', function (req, res) {
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    getCategory(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('category', context);
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
    var sql = "INSERT INTO category (`category`) VALUES (?)";
    var inserts = [req.body.new_category_name];
    sql = mysql.pool.query(sql, inserts, function (err, results) {
      if (err) {
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/category');
      }
    });
  });

  router.post('/update', function (req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "UPDATE category SET category = ? WHERE id = ?";
    var inserts = [req.body.editCategoryName, req.body.updateID];
    sql = mysql.pool.query(sql, inserts, function (err, results) {
      if (err) {
        console.log(JSON.stringify(err))
        res.write(JSON.stringify(err));
        res.end();
      } else {
        res.redirect('/category');
      }
    });
  });
  return router;
}();