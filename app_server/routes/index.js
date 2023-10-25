const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

// Adding a comment to annoy git
/* Locations pages */
router.get('/register', ctrlLocations.registerPage);
router.get('/gamepage', ctrlLocations.gamePage);
router.get('/login', ctrlLocations.login);

/* Other pages */
router.get('/about', ctrlOthers.about);
module.exports = router;