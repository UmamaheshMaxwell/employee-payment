var pdf = require("pdfkit");
var fs = require("fs");

module.exports ={
	generatePDF : function(){
		var fileName = "Employee-Payslip-" + new Date().getTime().toString() + ".pdf"		
		var filepath = "./payslips/" + fileName;
		console.log(filepath);
		var myDoc = new pdf;
		myDoc.pipe(fs.createWriteStream(filepath));

		myDoc.font("Times-Roman")
			 .fontSize(48)
			 .text("NodeJS PDF Document", 100, 100);

		myDoc.end();
		return 	{
			filepath : filepath,
			fileName : fileName
		}
	}

}