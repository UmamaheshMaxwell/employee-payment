var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");
var EmployeeDetails = require("../models/employee")
var Tax = require("../models/tax")
var pdf = require("../services/generatePDF");
var payslip = require("../services/calculation");

router.get('/employeeData', function(req, res) {	
	Tax.getTaxDetails(function(err, data){
		if(err){
			throw err;
		}		
		res.json(data);
	})
});	


router.post("/getPaySlip", function(req, res){
	var employeeInfo = req.body;
	var salaryComponents ={};
	if(employeeInfo.firstName && employeeInfo.lastName && employeeInfo.salary &&
		validateForNumbers(employeeInfo.salary) && employeeInfo.rateOfInterest && 
		validateForNumbers(employeeInfo.rateOfInterest) && employeeInfo.paymentStartDate)
	{
		salaryComponents = payslip.calculateSalaryComponents(employeeInfo.firstName,
															 employeeInfo.lastName,
															 employeeInfo.salary.toString(),
															 employeeInfo.rateOfInterest,
															 employeeInfo.paymentStartDate)
	}
	
	res.json(salaryComponents);	
})


function sendPDFToBrowser(fileinfo, res){

}

function validateForNumbers(val){
	var regex = /^[0-9.,]+$/
	return regex.test(val);
}



module.exports = router;