var parseStringToFloat = require("../services/parseStringToFloat");

// contsructor function TaxInfo
function TaxInfo(id, taxToPay, ratePerDollor){
	this.id = id,
	this.taxToPay = taxToPay,
	this.ratePerDollor = ratePerDollor
}


function getTaxInfo(){				 	
	var taxInfoforIncomeLessThan18201=  null;
	var taxInfoforIncomeLessThan37001=  new TaxInfo(1, parseStringToFloat("0"), parseStringToFloat(".19"));
	var taxInfoforIncomeLessThan87001= new TaxInfo(2, parseStringToFloat("3,572"), parseStringToFloat(".325"));
	var taxInfoforIncomeLessThan180001=  new TaxInfo(3, parseStringToFloat("17,547"), parseStringToFloat(".37"));
	var taxforMaxIncome =  new TaxInfo(4, parseStringToFloat("54,232"), parseStringToFloat(".45"));

	return [taxInfoforIncomeLessThan18201,
			taxInfoforIncomeLessThan37001, 
			taxInfoforIncomeLessThan87001,
			taxInfoforIncomeLessThan180001, 
			taxforMaxIncome];
}

module.exports = getTaxInfo();
	
