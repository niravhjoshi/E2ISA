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
                 var response  = {
                    status:200,
                    message:expdataone
                };
                 if(err){
                     console.log("Error Finding Expense");
                     response.status = 500;
                     response.message =err;
                 }
                 else if (!expdataone){
                     console.log("Expense ID did not found in DB",expId);
                     response.status = 400;
                     response.message = {"message":"Expense ID not found"+expId};
                 }
                 res
                     .status(response.status)
                     .json(response.message);
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

   // This method will be update expense
module.exports.UpdExpOne = function (req,res) {
    console.log("Entering into updating Expense");
    var expId =  req.params.expId;
    Expense
        .findById(expId)
        .exec(
            function(err,expdataone) {
                var response  = {
                    status:200,
                    message:expdataone
                };
                if(err){
                    console.log("Error Finding Expense");
                    response.status = 500;
                    response.message =err;
                }
                else if (!expdataone){
                    console.log("Expense ID did not found in DB",expId);
                    response.status = 400;
                    response.message = {"message":"Expense ID not found"+expId};
                }
                if(response.status != 200){
                    res
                        .status(response.status)
                        .json(response.message);
                }
                else{
                    expdataone.ExppersonName = req.body.ExppersonName;
                    expdataone.ExpenseType = req.body.ExpenseType;
                    expdataone.ExpenseAmt = req.body.ExpenseAmt;
                    expdataone.ExpenseDate = req.body.ExpenseDate;
                    expdataone.ExpenseComm = req.body.ExpenseComm;
                    expdataone.save(function(err,expudpated){
                        if(err){
                            res
                                .status(500)
                                .json(err);
                        }
                        else{
                            res
                                .status(204)
                                .json();
                        }
                    })
                }

            });


};

//This method will delete one record from DB
module.exports.DelOne = function (req,res) {
    console.log("I am in Delete One method of Expense");
    var expId = req.params.expId;
    Expense
        .findByIdAndRemove(expId)
        .exec(
            function (err, expdataone) {

                if (err) {
                    res
                        .status(404)
                        .json(err);
                }
                else {
                    console.log("Expense Deleted ID:" + expId);
                    res
                        .status(204)
                        .json();
                }
            });
            };

















