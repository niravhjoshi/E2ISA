var mongoose  = require('mongoose');
var Invest = mongoose.model('Invest');
var fs =  require('fs');


// img path
var imgPath = './public/updImage/NiravProfilePic.PNG';

// This method will get all Invest from DB
module.exports.GetAllInvestments = function (req,res) {

    console.log("Getting all Investments");
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

    Invest
        .find()
        .skip(offset)
        .limit(count)

        .exec(function(err,invdata){
            console.log(invdata);
            console.log(err);
            if(err){
                console.log("Error finding Expense");
                res
                    .status(500)
                    .json(err);
            }
            else{
                console.log("Found Expenses:",invdata.length);
                res
                    .status(200)
                    .json(invdata)
            }
        });
};


//This method will get single investment from invest table.
module.exports.GetOneInv = function (req,res) {
    var invID =  req.params.invID;
    console.log("Invest ID",expId);
    Invest
        .findById(invID)
        .exec(
            function(err,invdataone) {
                var response  = {
                    status:200,
                    message:invdataone
                };
                if(err){
                    console.log("Error Finding Investment");
                    response.status = 500;
                    response.message =err;
                }
                else if (!expdataone){
                    console.log("Investment ID did not found in DB",invID);
                    response.status = 400;
                    response.message = {"message":"Investment ID not found"+invIDn};
                }
                res
                    .status(response.status)
                    .json(response.message);
            });

};

//This route will add Investment in to DB
module.exports.InvAddOne = function (req,res) {
    console.log("Entering into inserting Investment");
    var inv = new Invest({
        InvesterName : req.body.InvesterName,
        InvestType : req.body.InvestType,
        InvestAmt : parseInt(req.body.InvestAmt,10),
        InvestStartDate : req.body.InvestStartDate,
        InvestEndDate : req.body.InvestEndDate,
        InvestDueDate : req.body.InvestDueDate,
        InvestmentComm : req.body.InvestmentComm
    });
    inv.InvestImage.data = fs.readFileSync(imgPath);
    inv.InvestImage.contentType = 'image/PNG';
    inv.save(function (err,inv) {

        if(err){
            console.log("Error while inserting Investment");
            res
                .status(400)
                .json(err);
        }
        else {
            console.log("Investment is added fine");
            res
                .status(201)
                .json(inv);
        }
        });
/*
    Invest
        .create({
            InvesterName : req.body.InvesterName,
            InvestType : req.body.InvestType,
            InvestAmt : parseInt(req.body.InvestAmt,10),
            InvestStartDate : req.body.InvestStartDate,
            InvestEndDate : req.body.InvestEndDate,
            InvestDueDate : req.body.InvestDueDate,
            InvestmentComm : req.body.InvestmentComm



        });
        Invest.InvestImage.data = fs.readFileSync(imgPath);
        Invest.InvestImage.contentType = 'png';
        Invest.save(function (err,inv) {

            if(err){
                console.log("Error while inserting Investment");
                res
                    .status(400)
                    .json(err);
            }
            else{
                console.log("Investment is added fine");
                res
                    .status(201)
                    .json(inv);
            }
        });
*/

};

// This method will be update expense
module.exports.UpdInvOne = function (req,res) {
    console.log("Entering into updating Invest");
    var invID =  req.params.invID;
    Invest
        .findById(invID)
        .exec(
            function(err,invdataone) {
                var response  = {
                    status:200,
                    message:invdataone
                };
                if(err){
                    console.log("Error Finding Investment");
                    response.status = 500;
                    response.message =err;
                }
                else if (!invdataone){
                    console.log("Investment ID did not found in DB",invID);
                    response.status = 400;
                    response.message = {"message":"Investment ID not found"+invID};
                }
                if(response.status != 200){
                    res
                        .status(response.status)
                        .json(response.message);
                }
                else{
                    invdataone.InvesterName = req.body.InvesterName;
                    invdataone.InvestType = req.body.InvestType;
                    invdataone.InvestAmt = req.body.InvestAmt;
                    invdataone.InvestStartDate = req.body.InvestStartDate;
                    invdataone.InvestEndDate = req.body.InvestEndDate;
                    invdataone.InvestDueDate = req.body.InvestDueDate;
                    invdataone.InvestImage = req.body.InvestImage;
                    invdataone.InvestmentComm = req.body.InvestmentComm;
                    invdataone.save(function(err,invudpated){
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
    var invID = req.params.invID;
    Invest
        .findByIdAndRemove(invID)
        .exec(
            function (err, expdataone) {

                if (err) {
                    res
                        .status(404)
                        .json(err);
                }
                else {
                    console.log("Expense Deleted ID:" + invID);
                    res
                        .status(204)
                        .json();
                }
            });
};

















