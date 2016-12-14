var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");
var EmployeeDetails = require("../models/employee")
var pdf = require("../services/generatePDF")

router.get('/employeeData', function(req, res) {
	EmployeeDetails.find(function(err, employeeData){
		if(err){
			throw err;
		}
		res.json(employeeData);
	})	
});

router.post("/getPaySlip", function(req, res){		

	var fileinfo = pdf.generatePDF();
	var file = fs.createReadStream(fileinfo.filepath);
	var stat = fs.statSync(fileinfo.filepath);
	res.setHeader('Content-Length', stat.size);
	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader('Content-Disposition', 'inline; filename=' + fileinfo.fileName);
	file.pipe(res);
	res.send();	
})


function sendPDFToBrowser(fileinfo, res){

}

module.exports = router;