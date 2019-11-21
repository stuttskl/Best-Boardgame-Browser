var express = require('express');
var mysql = require('./dbcon.js');
var morgan = require('morgan');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/', express.static('public'));
app.set('mysql', mysql);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 39993);

app.get('/', function(req, res, next) {
  res.render('home');
});

app.use('/players', require('./public/js/players.js'));
app.use('/games', require('./public/js/games.js'));
app.use('/groups', require('./public/js/groups.js'));
app.use('/category', require('./public/js/category.js'));

// Error handling route
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
    console.log('server listening on: flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
