var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
//var Grid = require('gridfs-stream');
var fileUpload = require('express-fileupload');


var ctrlExpense = require('../controller/expense.controller.js');
var ctrlEarning = require('../controller/earning.controller.js');
var ctrlInvest = require('../controller/invest.controller.js');

var uploads =multer({ dest: './public/updImage/'});

//Expense App Routes
router
  .route('/expense')
  .get(ctrlExpense.GetAllExpenses);
router
    .route('/expenseadd')
    .post(ctrlExpense.ExpAddOne);
router
    .route('/expense/:expId')
    .get(ctrlExpense.GetOneExp)
    .put(ctrlExpense.UpdExpOne)
    .delete(ctrlExpense.DelOne);





//Earning App Routes

router
    .route('/earning')
    .get(ctrlEarning.GetAllEarnings);

//Add one earning
router
    .route('/earningadd')
    .post(ctrlEarning.EarnAddOne);

//Update and delete and get one
router
    .route('/earning/:earID')
    .get(ctrlEarning.GetOneEarn)
    .put(ctrlEarning.UpdEarOne)
    .delete(ctrlEarning.DelOne);


//Invest App routes


router
    .route('/invest')
    .get(ctrlInvest.GetAllInvestments);

//Add one earning
router
    .route('/investadd')
    .post(ctrlInvest.InvAddOne);

//Update and delete and get one
router
    .route('/invest/:invID')
    .get(ctrlInvest.GetOneInv)
    .put(ctrlInvest.UpdInvOne)
    .delete(ctrlInvest.DelOne);


//Router file upload function

router.post('/upload',function(req,res) {

    if(!req.files){
        return res.status(400).send('No files are uploaded');

    }

    var sampleFile = req.files.sampleFile;
    var samplename = req.files.sampleFile.name;

    sampleFile.mv('./public/updImage/some.png',function(err){
        if(err)
            return res.status(500).send(err);
        res.send('File uploaded!'+samplename);

    });


});


/*
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);
*/
module.exports = router;