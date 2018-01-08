var mongoose  = require('mongoose');
var Expense = mongoose.model('Expense');

module.exports.GetAllExpenses = function (req,res) {

    console.log("Getting all expenses");
    var offset =0;
    var count = 5;
    if(req.query && req.query.offset)
    {
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }

    Expense
        .find()
        .skip(offset)
        .limit(count)

        .exec(function(err,expdata){
            console.log("Found the Expense Data",expdata.length);
            res
                .json(expdata);
        })
};


//This method will get single expense from expense table.
   module.exports.GetOneExp = function (req,res) {
       console.log("Entering into get expense by ID ");
       var expId =  req.params.expId;
       console.log("Expense ID",expId);
       Expense
           .findById(expId)
           .exec(
            function(err,expdataone) {
               res
                   .status(200)
                   .json(expdataone);
           });

   };

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
