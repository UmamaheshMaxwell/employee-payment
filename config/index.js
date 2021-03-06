global.ENV = process.env.NODE_ENV || (process.env.NODE_ENV = 'development')

config = require("./" + ENV)

module.exports = {
	get: function(key) {
		if (key == 'env') {
			return ENV;
		} else {
			return config[key];
		}
	},
}