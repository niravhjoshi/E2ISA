var mongoose  = require('mongoose');
var expense = mongoose.model('Expense');

module.exports.GetAllExpenses = function (req,res) {

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
        .exec(function(err,expdata){
            console.log("Found the Expense Data",expdata.length);
            res
                .json(expdata);
        })
   /* collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function (mongoError, objects) {
            console.log("found records",objects);
            res
                .status(200)
                .json(objects);
        });
    */
};