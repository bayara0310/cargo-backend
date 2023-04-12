const express = require('express');
const router = express.Router()

//import controllers
const { Cargoadd, cargoUpdate, cargoAll, CargoFindType, CargoFindStatus, findOne, findDashboard, cargoStatusUpdate, CommentAdd, commentCargoOne, commentUserOne, cargoTypeUpdate } = require('../controllers/cargo');
const { runValidation } = require('../validators');
const { cargoSignupValidator } = require('../validators/cargo');

router.post('/cargo/add',cargoSignupValidator,runValidation, Cargoadd);
router.put('/cargo/update/:id', cargoUpdate);
router.get('/cargo/all', cargoAll);
router.post('/cargo/status', CargoFindStatus);

router.post('/cargo/type', CargoFindType);
router.patch('/cargo/type/update/:id', cargoTypeUpdate)

router.get('/cargo/:id', findOne);
router.post('/cargo/status/update/:id', cargoStatusUpdate);
router.post('/comment/add', CommentAdd);
router.get('/comment/cargo/:id', commentCargoOne);
router.get('/comment/user/:id', commentUserOne);

module.exports = router;