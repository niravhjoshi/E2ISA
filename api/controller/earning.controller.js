var mongoose  = require('mongoose');
var Earnings = mongoose.model('Earnings');

// This method will get all expense from DB
module.exports.GetAllEarnings = function (req,res) {

    console.log("Getting all Earnings");
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

    Earnings
        .find()
        .skip(offset)
        .limit(count)

        .exec(function(err,earndata){
            console.log(earndata);
            console.log(err);
            if(err){
                console.log("Error finding Earninigs");
                res
                    .status(500)
                    .json(err);
            }
            else{
                console.log("Found Earnings:",earndata.length);
                res
                    .status(200)
                    .json(earndata)
            }
        });
};

//This method will get single expense from expense table.
module.exports.GetOneEarn = function (req,res) {
    var earID =  req.params.earID;
    console.log("Earning ID",earID);
    Earnings
        .findById(earID)
        .exec(
            function(err,earndataone) {
                var response  = {
                    status:200,
                    message:earndataone
                };
                if(err){
                    console.log("Error Finding Earning Data");
                    response.status = 500;
                    response.message =err;
                }
                else if (!earndataone){
                    console.log("Earning ID did not found in DB",earID);
                    response.status = 400;
                    response.message = {"message":"Earning ID not found"+earID};
                }
                res
                    .status(response.status)
                    .json(response.message);
            });

};



//This route will add Earning  in to DB
module.exports.EarnAddOne = function (req,res) {
    console.log("Entering into inserting Earninig");
    Earnings
        .create({
            EarnerName : req.body.EarnerName,
            EarningType : req.body.EarningType,
            EarningAmt : parseInt(req.body.EarningAmt,10),
            EarningDate : req.body.EarningDate,
            EarningComment : req.body.EarningComment

        },function (err,ear) {

            if(err){
                console.log("Error while inserting Earnings");
                res
                    .status(400)
                    .json(err);
            }
            else{
                console.log("Earning is added fine");
                res
                    .status(201)
                    .json(ear);
            }
        });


};


// This method will be update expense
module.exports.UpdEarOne = function (req,res) {
    console.log("Entering into updating Earnings");
    var earID =  req.params.earID;
    Earnings
        .findById(earID)
        .exec(
            function(err,eardataone) {
                var response  = {
                    status:200,
                    message:eardataone
                };
                if(err){
                    console.log("Error Finding Earnings");
                    response.status = 500;
                    response.message =err;
                }
                else if (!eardataone){
                    console.log("Earning ID did not found in DB",earID);
                    response.status = 400;
                    response.message = {"message":"Earning ID not found"+earID};
                }
                if(response.status != 200){
                    res
                        .status(response.status)
                        .json(response.message);
                }
                else{
                    eardataone.EarnerName = req.body.EarnerName;
                    eardataone.EarningType = req.body.EarningType;
                    eardataone.EarningAmt = req.body.EarningAmt;
                    eardataone.EarningDate = req.body.EarningDate;
                    eardataone.EarningComment = req.body.EarningComment;
                    eardataone.save(function(err,earudpated){
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

//This method will delete one record from DB Earnings
module.exports.DelOne = function (req,res) {
    console.log("I am in Delete One method of Earning");
    var earID = req.params.earID;
    Earnings
        .findByIdAndRemove(earID)
        .exec(
            function (err, eardataone) {

                if (err) {
                    res
                        .status(404)
                        .json(err);
                }
                else {
                    console.log("Earning Deleted ID:" + earID);
                    res
                        .status(204)
                        .json();
                }
            });
};