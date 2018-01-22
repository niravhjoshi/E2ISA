var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var upload =multer({ dest: './public/updImage/'});



var ctrlExpense = require('../controller/expense.controller.js');
var ctrlEarning = require('../controller/earning.controller.js');
var ctrlInvest = require('../controller/invest.controller.js');


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
/*

router.post('/upload',function(req,res) {


var part = req.files.file;
var writestream = gfs.createWriteStream({
    filename: 'img_'+part.name,
    mode : 'w',
    content_type: part.mimeType

});

writestream.on('close',function(file){
    return res.status(200).send({
        message : 'Sucess',
        file : file
    });


});

writestream.write(part.data);
writestream.end();
});


*/


/*
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);
*/
module.exports = router;