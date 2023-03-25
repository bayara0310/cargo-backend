const express = require('express');
const router = express.Router()

//import controllers
const { Cargoadd, cargoUpdate } = require('../controllers/cargo');
const { runValidation } = require('../validators');
const { cargoSignupValidator } = require('../validators/cargo');

router.post('/cargo/add',cargoSignupValidator,runValidation, );

module.exports = router;