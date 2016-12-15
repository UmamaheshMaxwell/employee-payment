var mongoose = require('mongoose')
, Schema = mongoose.Schema

var taxInfoSchema = Schema({
  _id			      : Number,	
  _taxDetailsId	: { type: Number, ref: 'TaxDetails' },  
  taxToPay		  : String,
  ratePerDollor	: String 
});

var taxDetailsSchema = Schema({
  _id       : Number,
  minIncome	: String,
  maxIncome	: String, 
  taxInfo	: [taxInfoSchema]
});

var TaxDetails = module.exports  = mongoose.model("TaxDetails", taxDetailsSchema, "TaxDetails");
var TaxInfo = module.exports = mongoose.model('TaxInfo', taxInfoSchema, "TaxInfo");

module.exports.getTaxDetails = function(){
	return new Promise(function(resolve, reject){
		TaxDetails.find().populate("TaxInfo").exec(function(err, data){
			if(err){
				reject(err)
			}
			resolve(data);
		});
	})
	
}

