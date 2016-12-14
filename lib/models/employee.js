var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({

	firstName : {
		type: String,
		required: true
	},
	lastName : {
		type: String,
		required: true
	},
	salary: {
		type: String,
		required: true
	},	
	rateOfInterest: {
		type: String,
		required: true
	},	
	paymentStartDate: {
		type: String,
		required: true
	}	
});

var EmployeePayment = module.exports = mongoose.model("EmployeePayment", contactSchema,"EmployeePayment");

module.exports.getContacts = function(callback){
	EmployeePayment.find(callback)
}


