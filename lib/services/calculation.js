var TaxDetails = require("../models/taxDetails")
var TaxInfo = require("../models/taxInfo")
var dateFormat = require("./dateFormat");


function calculateSalaryComponents(annualSalary, superRate){

	
	console.log("Month of " + dateFormat.getMonthName)
	console.log(dateFormat.GetCurrentMonthDetails.firstDay);

	var payPeriodString = "Month of " + dateFormat.getMonthName +"(" + dateFormat.GetCurrentMonthDetails.firstDay + 
										" " +  dateFormat.getMonthName  +  " to " + dateFormat.GetCurrentMonthDetails.lastDay + "  " + 
										dateFormat.getMonthName + ")" 
	var grossIncome = Math.floor(parseStringValueToFloat(annualSalary) /12);
	var incometax = calculateIncometax(parseStringValueToFloat(annualSalary));
	var netIncome = grossIncome -incometax;
	var superRate = Math.floor(grossIncome * (superRate/100))

	console.log(payPeriodString);
	console.log(grossIncome);
	console.log(incometax)
	console.log(netIncome)
	console.log(superRate)
	return	{
		payPeriod : payPeriodString,
		grossIncome : grossIncome,
		incometax : incometax,
		netIncome : netIncome,
		superRate: superRate
	}
}

console.log("01 March – 31 March".split(" "))
calculateSalaryComponents("15000" ,9)
//calculateIncometax(parseStringValueToFloat("120000"))
function calculateIncometax(annualSalary){
	var totaltax;
	if(annualSalary > 18200){	 

	 var taxDetails = getTaxDetails();
	 	taxDetails.forEach(function(taxComponent){
	 		if(annualSalary > taxComponent.minIncome && 
	 			annualSalary < taxComponent.maxIncome){
	 			totaltax =  Math.ceil((taxComponent.tax.taxToPay +
	 								 ((annualSalary - taxComponent.minIncome) * 
	 								 	taxComponent.tax.ratePerDollor))/12) ;
	 			
	 		}
	 	})		

	 	return totaltax;
	 }
	 return 0;

	
}

function parseStringValueToFloat(stringValue) {
  return parseFloat(stringValue.replace(',', ''))
}

function getTaxDetails(){
	var taxDetailforIncomeLessThan18201  = new TaxDetails(1, parseStringValueToFloat("0"), parseStringValueToFloat("18,200"), getTaxInfo()[0]);
	var taxDetailforIncomeLessThan37001  = new TaxDetails(2, parseStringValueToFloat("18,201"), parseStringValueToFloat("37,000"), getTaxInfo()[1]);
	var taxDetailforIncomeLessThan87001  = new TaxDetails(3, parseStringValueToFloat("37,001"), parseStringValueToFloat("87,000"), getTaxInfo()[2]);
	var taxDetailforIncomeLessThan180001  = new TaxDetails(4, parseStringValueToFloat("80,001"), parseStringValueToFloat("180,000"), getTaxInfo()[3]);
	var taxDetailforMaxIncome  = new TaxDetails(5, "180,001", Math.max(), getTaxInfo()[4]);

	return [
			taxDetailforIncomeLessThan18201,
			taxDetailforIncomeLessThan37001,
			taxDetailforIncomeLessThan87001,
			taxDetailforIncomeLessThan180001,
			taxDetailforMaxIncome
			]

}


function getTaxInfo(){				 	
	var taxInfoforIncomeLessThan18201 =  null;
	var taxInfoforIncomeLessThan37001 =  new TaxInfo(1, parseStringValueToFloat("0"), parseStringValueToFloat(".19"));
	var taxInfoforIncomeLessThan87001 = new TaxInfo(2, parseStringValueToFloat("3,572"), parseStringValueToFloat(".325"));
	var taxInfoforIncomeLessThan180001 =  new TaxInfo(3, parseStringValueToFloat("17,547"), parseStringValueToFloat(".37"));
	var taxforMaxIncome =  new TaxInfo(4, parseStringValueToFloat("54,232"), parseStringValueToFloat(".45"));

	return [taxInfoforIncomeLessThan18201,
			taxInfoforIncomeLessThan37001,
			taxInfoforIncomeLessThan87001,
			taxInfoforIncomeLessThan180001,
			taxforMaxIncome];	 	
	 
}

