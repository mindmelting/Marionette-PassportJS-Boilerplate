'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var dbsetup = require('./dbsetup');
var apiroutes = require('./apiroutes');
var passport = require('passport');
var passportStrategy = require('./passportStrategy');

var db = dbsetup.db;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

	var app = express();

	app.configure(function() {
		// mount static

		app.set('port', 9000);
		app.set('view engine', 'handlebars');
		app.set('views', __dirname + '../app/scripts/views');
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.session({
			secret: 'keyboard cat'
		}));

		// setup passport
		app.use(passport.initialize());
		app.use(passport.session());
		passportStrategy.localPassportStrategy();

		// setup baucis routes
		apiroutes.setupRoutes(app);
		app.use('/api/v1', baucis());

		// simple log
		app.use(function(req, res, next) {
			//console.log('%s %s', req.method, req.url);
			next();
		});

		// route index.html
		app.get('/', function(req, res) {
			var authenticated = false;

			passport.authenticate('local');
			if (req.user && req.isAuthenticated()) {
				authenticated = true;
			}
			res.cookie('loginStatus', authenticated.toString());
			res.sendfile(path.join(__dirname, '../app/index.html'));
		});

		app.use(express.static(path.join(__dirname, '../app')));
		app.use(express.static(path.join(__dirname, '../.tmp')));
	});



	// start server
	http.createServer(app).listen(app.get('port'), function() {
		console.log('Express App started!');
	});
});