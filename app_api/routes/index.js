const express = require('express');
const router = express.Router();
const ctrlCustomers = require('../controllers/locations');
const ctrlGames = require('../controllers/games');
const passport = require('passport');

const index = function(req,res) {
    res.render('index');
}
module.exports.index = index;

// Routes concerning the Customers.
router
    .route('/login')
    .get(ctrlCustomers.loginPage)
    .post(ctrlCustomers.loginUser)

router
    .route('/login/:custid')
    .get(ctrlCustomers.customerReadOne)
    .put(ctrlCustomers.customerUpdate)
    .delete(ctrlCustomers.customerDeleteOne);

// Routes for the data page.
// If you're missing something, it may be res.render() in locations.
router
    .route('/gamepage')
    .get(ctrlGames.getGame);

router
    .route('/registration')
    .get(ctrlCustomers.pageVariables)
    .post(ctrlCustomers.customerCreate);

router
    .route('/about')
    .get(ctrlCustomers.about);

module.exports = router;