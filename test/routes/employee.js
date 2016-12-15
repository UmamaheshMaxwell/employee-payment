var chai   = require("chai"),
	expect = chai.expect,
	should = chai.should(),
	supertest = require("supertest");

var server = supertest.agent("http://localhost:3000");

describe("Employee Test Suite", function(){

	it("should get the employee payslip after passing inputs", function(done){

		var employeeInfo = {
			  firstName : "Umamaheswararao",
			  lastName : "Meka",
			  salary : "60,050",
			  rateOfInterest : 9,
			  paymentStartDate : "01 March – 31 March"		
		}

		server.post("/getPaySlip")
			  .send(employeeInfo)
			  .expect(200)
			  .expect("content-type", /json/)
			  .end(function(err, res){			  	
					res.body.should.be.an("object");
					res.body.should.have.property("fullname", "Umamaheswararao Meka");
					res.body.should.have.property("payPeriod", "01 March – 31 March");
					res.body.should.have.property("grossIncome").be.equal(5004);
					res.body.should.have.property("incometax").be.equal(922);
					res.body.should.have.property("netIncome").be.equal(4082);
					res.body.should.have.property("superRate").be.equal(450);
			  	done()
			  })
	})

	it("should send empty reponse if we post without inputs", function(done){

		server.post("/getPaySlip")			  
			  .expect(200)
			  .expect("content-type", /json/)
			  .end(function(err, res){
					res.body.should.be.empty;
			  	done()
			  })
	})
})


