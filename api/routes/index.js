var express = require('express');
var router = express.Router();

var ctrlExpense = require('../controller/expense.controller.js');

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
    .put(ctrlExpense.UpdExpOne);


/*
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);
*/
module.exports = router;