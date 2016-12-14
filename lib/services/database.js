var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var config = require('../../config');
var Promise = require('promise');
var DB = function() {
	this.connection = null;
}


DB.prototype.connect = function() {	
	return new Promise(function(resolve, reject) {		
		logger.info('Connecting to ' + config.get('DB_NAME'));
		mongoose.connect("mongodb://" + config.get('DB_USERNAME') +":" + config.get('DB_PASSWORD') +"@ds133378.mlab.com:33378/" +config.get("DB_NAME"),function(err) {
		    if (err){		    	
		       reject(err);
		    }else{
		    	logger.info('Succeefully connected to ' + config.get('DB_NAME'));
		    	resolve();
		    }
		});
	});
};

module.exports = {
	database: null,
	connect: function() {
		this.database = new DB();
		return this.database.connect();
	}
};