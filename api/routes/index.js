var express = require('express');
var router = express.Router();

var ctrlExpense = require('../controller/expense.controller.js');
var ctrlEarning = require('../controller/earning.controller.js');
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





/*
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);
*/
module.exports = router;