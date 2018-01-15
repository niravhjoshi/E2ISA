var mongoose  = require('mongoose');

var ExpenseSchema= new mongoose.Schema({

	ExppersonName : {type: String,required: true},
	ExpenseType: {type: [String],required: true},
	ExpenseAmt: {type: Number,required: true},
	ExpenseDate: {type:Date,required: true},
	ExpenseComm: {type:String}
	
});

mongoose.model('Expense',ExpenseSchema);