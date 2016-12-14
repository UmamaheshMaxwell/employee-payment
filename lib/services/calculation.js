function calculateSalary(annualSalary){

}

function calculateIncometax(annualSalary){
	var taxableIncome;
	var nontaxableIncome = parseSalary("18,200.5");
	if(nontaxableIncome > 18200){
		console.log(true);
		return nontaxableIncome + 1
	}

	return nontaxableIncome;
}

function parseSalary(stringValue) {
    stringValue = stringValue.trim();
    var result = stringValue.replace(/[^0-9]/g, '');
    if (/[,\.]\d{2}$/.test(stringValue)) {
        result = result.replace(/(\d{2})$/, '.$1');
    }
    return parseFloat(result);
}
