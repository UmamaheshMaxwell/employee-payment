/*
  This is Calculation Service
  @Author : Umamaheswararao Meka
*/
var TaxDetails = require("../models/taxDetails")
var parseStringToFloat = require("./parseStringToFloat");
var dateFormat = require("./dateFormat");


function calculateSalaryComponents(firstName, lastname, annualSalary, rate, paymentStartDate){
	
	//fullname
	var fullname = firstName + " " + lastname;

	// Pay Period Message
	var payPeriodMessage = "Month of " + dateFormat.getMonthName +
						  "(" + dateFormat.GetCurrentMonthDetails.firstDay + 
						  " " +  dateFormat.getMonthName  +  " to " + 
						  dateFormat.GetCurrentMonthDetails.lastDay + "  " + 
						  dateFormat.getMonthName + ")" 

	//GrossIncome - annual salary / 12 months				  
	var grossIncome = Math.floor(parseStringToFloat(annualSalary) /12);

	// Incometax - check calculateIncometax method
	var incometax = calculateIncometax(parseStringToFloat(annualSalary));

	//NetIncome - gross income - income tax
	var netIncome = grossIncome -incometax;

	// SuperRate - gross income x super rate
	var superRate = Math.floor(grossIncome * (rate/100))

	return	{
		fullname: fullname,
		payPeriod : paymentStartDate,
		grossIncome : grossIncome,
		incometax : incometax,
		netIncome : netIncome,
		superRate: superRate
	}
}

/*
   This method takes annual salary as an argument, 
   calculates incometax and returns it
*/
function calculateIncometax(annualSalary){
	if(annualSalary > 18200){	 
		var taxDetailInfo = getTaxDetailsInfo(annualSalary);
	 	return  Math.ceil((taxDetailInfo.taxToPay +
	 					 ((annualSalary - taxDetailInfo.minIncome) * taxDetailInfo.ratePerDollor))/12) ;
	 }
	 return 0;	
}

function getTaxDetailsInfo(annualSalary){

	var minIncome, taxToPay, ratePerDollor; 
	 var taxDetails = TaxDetails.getTaxDetails();
 	taxDetails.forEach(function(taxComponent){	 		
 		if(annualSalary > taxComponent.minIncome && annualSalary < taxComponent.maxIncome){
 			minIncome = taxComponent.minIncome -1;
 			taxToPay = taxComponent.tax.taxToPay;
 			ratePerDollor = taxComponent.tax.ratePerDollor;
 		}
 	})

 	return {
 		minIncome: minIncome, 
 		taxToPay: taxToPay, 
 		ratePerDollor: ratePerDollor
 	}
}

module.exports = {
	calculateSalaryComponents : calculateSalaryComponents,
	calculateIncometax: calculateIncometax,
	getTaxDetailsInfo: getTaxDetailsInfo

}