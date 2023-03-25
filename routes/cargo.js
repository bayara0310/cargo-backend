const express = require('express');
const router = express.Router()

//import controllers
const { Cargoadd, cargoUpdate, cargoAll } = require('../controllers/cargo');
const { runValidation } = require('../validators');
const { cargoSignupValidator } = require('../validators/cargo');

router.post('/cargo/add',cargoSignupValidator,runValidation, Cargoadd);
router.put('/cargo/update/:id', cargoUpdate);
router.get('/cargo/all', cargoAll);

module.exports = router;