const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
// locations

const index = function(req,res) {
    res.render('index');
}
module.exports.index = index;

router
    .route('/customers')
    .get(ctrlLocations.locationsCreate)
    .put(ctrlLocations.locationsUpdateOne);
router
    .route('/customers/:custid')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

router
    .route('/customers/:custid/reviews')
    .post(ctrlReviews.reviewsCreate);
/*router
    .route('/customers/:custid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);*/
module.exports = router;