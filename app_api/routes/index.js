const express = require('express');
const router = express.Router();
const ctrlCustomers = require('../controllers/locations');
const ctrlGames = require('../controllers/games');

const index = function(req,res) {
    res.render('index');
}
module.exports.index = index;

// Routes concerning the Customers.
router
    .route('/customers')
    .get(ctrlCustomers.customerCreate)
router
    .route('/customers/:custid')
    .get(ctrlCustomers.customerReadOne)
    .put(ctrlCustomers.customerUpdate)
    .delete(ctrlCustomers.customerDeleteOne);

// Routes for the data page.
router
    .route('/gamepage')
    .get(ctrlGames.getGame);

router
    .route('/register')
router
    .route('login')

module.exports = router;