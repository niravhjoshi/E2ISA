var mongoose  = require('mongoose');

var ShareSchema= new mongoose.Schema({

	ShareName : {type:String,required : true},
	ShareTranAmt: {type:Number, required: true},
	ShareTranType: {type:String, required: true},
	ShareNo: {type:Number, required: true},
	SharePerAmt: {type:Number, required: true},
	ShareBuyDate: {type:Date, required: true},
	ShareSellDate: {type:Date, required: true},
	ShareDueDate: {type:Date, required: true},
	ShareImg: {data: Buffer, contentType: String}
	
});


mongoose.model('Share',ShareSchema);