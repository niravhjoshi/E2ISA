var mongoose  = require('mongoose');

var earningSchema= new mongoose.Schema({

	EarnerName : {type:String, required: true},
	EarningType: {type:[String],required: true},
	EarningAmt: {type:Number,required: true},
	EarningDate: {type:Date,required: true}

});


mongoose.model('Earnings',earningSchema);
