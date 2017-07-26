var Sequelize = require('sequelize');	
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres: Letmein1234!@localhost:5432/workoutlog', {
	dialect: 'postgres'
});

// Use the password on line 7 to sign in and be authenticated:
sequelize.authenticate().then(	// "Once you're authenticated, THEN..."
	function() {
		console.log('Connected to workoutlog postgres db');	//"...log this sentence."
	},	// This comma indicates that there are 2 arguments in this function.
	function(err) {	// "If authentication fails..."
		console.log(err);	// "...log an error."
	}
);

// Import server > models > user.js:
var User = sequelize.import('./models/user');

// Export statement:
module.exports = sequelize;
