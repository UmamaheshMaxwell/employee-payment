var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path")
var router = express.Router();
var config = require('../config');
// Custom logging - adds `logger` to the global object
require('./services/logging')

// Define the express application
var app = express();

module.exports = function() {
	var promise = new Promise(function(resolve, reject) {
	require('./services/database').connect()
		.then(function() {
		// Express configuration
		try {
			var PORT = (process.env.PORT) ? (process.env.PORT) : (3000);
			app.set('port', PORT);
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({extended: false}));			
			require('./routes/index').register(app);						
			app.use(express.static(config.get('CWD') + '/public'));          
		} catch (err) {			
			logger.info('Failed to set app configuration: %s', err.message);
		}

		logger.info('Set application configuration');

		app.use(function(err, req, res, next) {
			logger.error(err.message);
			res.status(err.status || 500);
			if (process.env.NODE_ENV === 'production') {
				res.send('An error has occurred.');
			} else {
				res.send(err.stack);
			}
		});

		app.server = app.listen(PORT, function() {
			logger.log('Express server listening on port %d', PORT);
		});

		resolve();
		});
	})
	.catch(function(err) {
		logger.error('Something failed during mongo connect: %s', err.message);
		logger.info(err.stack);
		reject();
	});
}