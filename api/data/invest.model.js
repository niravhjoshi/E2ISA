var mongoose  = require('mongoose');

var investSchema= new mongoose.Schema({

	InvesterName : {type:String, required : false},
	InvestType: {type:[String], required: false},
	InvestAmt: {type:Number, required: false},
	InvestStartDate: {type:Date, required: false},
	InvestEndDate: {type:Date, required: false},
	InvestDueDate: {type:Date, required: false},
	InvestImage: { data: Buffer, contentType: String },
	InvestmentComm:	{type:String}
	
});

mongoose.model('Invest',investSchema);
module.exports= investSchema;
