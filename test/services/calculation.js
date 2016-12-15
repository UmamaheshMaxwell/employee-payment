var chai   = require("chai"),
	expect = chai.expect,
	should = chai.should();
	
var calculation = require("../../lib/services/calculation")
var parseStringToFloat = require("../../lib/services/parseStringToFloat");

describe("Calculation Test Suite", function(){

	it("Should get  detailed tax info to calculate IncomeTax", function(){
		var annualSalary = "60,050"
		var taxDetailInfo =	calculation.getTaxDetailsInfo(parseStringToFloat(annualSalary))
		taxDetailInfo.should.be.an("object");
		taxDetailInfo.should.have.property("minIncome").be.a("number")
		taxDetailInfo.should.have.property("minIncome").not.be.a("string")
		taxDetailInfo.should.have.property("minIncome").be.equal(37000)
		taxDetailInfo.should.have.property("taxToPay").be.equal(3572)
		taxDetailInfo.should.have.property("ratePerDollor").be.equal(0.325)
	})

	it("Should calculate IncomeTax", function(){
		var annualSalary = "60,050"
		var incomeTax =	calculation.calculateIncometax(parseStringToFloat(annualSalary))
		
	   incomeTax.should.be.a("number");
	   incomeTax.should.be.equal(922);
	})

	it("Should calculate salary components", function(){

		var employeeInfo = {
			  firstName : "Umamaheswararao",
			  lastName : "Meka",
			  salary : "60,050",
			  rateOfInterest : 9,
			  paymentStartDate : "01 April – 31 April"		
		}
		var annualSalary = "60,050"
		var payslip =	calculation.calculateSalaryComponents(employeeInfo.firstName,
															  employeeInfo.lastName,
															  employeeInfo.salary.toString(),
															  employeeInfo.rateOfInterest,
															  employeeInfo.paymentStartDate)

		payslip.should.be.an("object");
		payslip.should.have.property("fullname", "Umamaheswararao Meka");
		payslip.should.have.property("payPeriod", "01 April – 31 April");
		payslip.should.have.property("grossIncome").be.equal(5004);
		payslip.should.have.property("incometax").be.equal(922);
		payslip.should.have.property("netIncome").be.equal(4082);
		payslip.should.have.property("superRate").be.equal(450); 
	})

});