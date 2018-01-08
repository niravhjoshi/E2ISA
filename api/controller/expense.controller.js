var mongoose  = require('mongoose');
var Expense = mongoose.model('Expense');

// This method will get all expense from DB
module.exports.GetAllExpenses = function (req,res) {

    console.log("Getting all expenses");
    var offset =0;
    var count = 5;
    var maxcount =80;

    if(req.query && req.query.offset)
    {
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }

    if(isNaN(offset) || isNaN(count)){
        res
            .status(400)
            .json({"message":"If supplied in querystring count and offset must be both numbers"});
        return;
    }
    if (count > maxcount){
        res
            .status(400)
            .json({"message":"Count limit of "+maxcount+"exceeded"});
        return;
    }

    Expense
        .find()
        .skip(offset)
        .limit(count)

        .exec(function(err,expdata){
            console.log(expdata);
            console.log(err);
            if(err){
                console.log("Error finding Expense");
                res
                    .status(500)
                    .json(err);
            }
            else{
                console.log("Found Expenses:",expdata.length);
                res
                    .status(200)
                    .json(expdata)
            }
        });
};


//This method will get single expense from expense table.
   module.exports.GetOneExp = function (req,res) {
       var expId =  req.params.expId;
       console.log("Expense ID",expId);
       Expense
           .findById(expId)
           .exec(
            function(err,expdataone) {
                res
                    .status(200)
                    .json(expdataone)
            });

   };
//This route will add expense in to DB
   module.exports.ExpAddOne = function (req,res) {
        console.log("Entering into inserting expense");
        Expense
            .create({
                ExppersonName : req.body.ExppersonName,
                ExpenseType : req.body.ExpenseType,
                ExpenseAmt : parseInt(req.body.ExpenseAmt,10),
                ExpenseDate : req.body.ExpenseDate,
                ExpenseComm : req.body.ExpenseComm

            },function (err,exp) {

                if(err){
                    console.log("Error while inserting expense");
                    res
                        .status(400)
                        .json(err);
                }
                else{
                    console.log("Expense is added fine");
                    res
                        .status(201)
                        .json(exp);
                }
            });


   };
