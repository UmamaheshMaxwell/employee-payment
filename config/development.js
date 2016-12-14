module.exports = {
	LOGGING_THRESHOLD: 'info',
	LOGGING_BASEDIR: process.cwd() + '/logs/',
	LOGGING: {
		DEFAULT: 'default.log',
		ERROR: 'error.log',
		FRONTEND: 'frontend.log',
	},
	CWD: process.cwd(),
	DB_USERNAME: 'UmaMongo',
	DB_PASSWORD: 'UmaMongo',
	DB_NAME: 'database_development'
}