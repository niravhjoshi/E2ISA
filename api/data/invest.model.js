var mongoose  = require('mongoose');

var investSchema= new mongoose.Schema({

	InvesterName : {type:String, required : true},
	InvestType: {type:String, required: true},
	InvestAmt: {type:Number, required: true},
	InvestStartDate: {type:Date, required: true},
	InvestEndDate: {type:Date, required: true},
	InvestDueDate: {type:Date, required: true},
	InvestImage: { data: Buffer, contentType: String }
	
});


mongoose.model('Invest',investSchema);