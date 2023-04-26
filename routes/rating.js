const express = require('express');
const { RatingAdd, RatingGet } = require('../controllers/rating');
const router = express.Router()

//import controllers

router.post('/rating/add', RatingAdd);
router.get('/rating/:id', RatingGet)

module.exports = router;
