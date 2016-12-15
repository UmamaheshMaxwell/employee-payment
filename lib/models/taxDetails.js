var taxInfo = require("./taxInfo")
var parseStringToFloat = require("../services/parseStringToFloat");

// contsructor function TaxDetails
function TaxDetails(id, minIncome, maxIncome, tax){
	this.id = id,
	this.minIncome = minIncome,
	this.maxIncome = maxIncome,
	this.tax = tax
}

function getTaxDetails(){
	var taxDetailforIncomeLessThan18201= new TaxDetails(1, parseStringToFloat("0"), parseStringToFloat("18,200"), taxInfo[0]),
		taxDetailforIncomeLessThan37001= new TaxDetails(2, parseStringToFloat("18,201"), parseStringToFloat("37,000"), taxInfo[1]),
		taxDetailforIncomeLessThan87001= new TaxDetails(3, parseStringToFloat("37,001"), parseStringToFloat("87,000"), taxInfo[2]),
		taxDetailforIncomeLessThan180001= new TaxDetails(4, parseStringToFloat("80,001"), parseStringToFloat("180,000"), taxInfo[3]),
		taxDetailforMaxIncome= new TaxDetails(5, "180,001", Math.max(), taxInfo[4]);

	return [taxDetailforIncomeLessThan18201, 
			taxDetailforIncomeLessThan37001,
			taxDetailforIncomeLessThan87001,
			taxDetailforIncomeLessThan180001, 
			taxDetailforMaxIncome]

}

module.exports = {
	TaxDetails: TaxDetails,
	getTaxDetails : getTaxDetails
}
