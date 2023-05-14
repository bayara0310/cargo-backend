const express = require('express');
const router = express.Router()

//import controllers
const { Cargoadd, cargoUpdate, cargoAll, CargoFindType, CargoFindStatus, findOne, cargoStatusUpdate, CommentAdd, commentCargoOne, commentUserOne, cargoTypeUpdate, cargoNationUpdate, cargoFilterNationtype, commentFindUser, findAllCargosInSites, CargoFindStatus1 } = require('../controllers/cargo');
const { runValidation } = require('../validators');
const { cargoSignupValidator } = require('../validators/cargo');

router.post('/cargo/add',cargoSignupValidator,runValidation, Cargoadd);
router.put('/cargo/update/:id', cargoUpdate);
router.get('/cargo/all', cargoAll);
router.post('/cargo/status', CargoFindStatus);
router.post('/cargo/status1', CargoFindStatus1);

router.post('/cargo/type', CargoFindType);
router.patch('/cargo/type/update/:id', cargoTypeUpdate)
router.patch('/cargo/nation/update/:id', cargoNationUpdate)
router.post('/cargo/filter/typen', cargoFilterNationtype);

router.get('/cargo/:id', findOne);
router.post('/cargo/status/update/:id', cargoStatusUpdate);

router.post('/comment/add', CommentAdd);
router.get('/comment/cargo/:id', commentCargoOne);
router.get('/comment/user/:id', commentUserOne);
router.get('/comment/user/find/:id', commentFindUser);

router.post("/cargo/sites", findAllCargosInSites)

module.exports = router;