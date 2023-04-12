const express = require('express');
const { signup, accountActivation, signin, findOneCargoAdmin } = require('../controllers/admin');
const router = express.Router()

//import controllers

router.post('/admin/add', signup);
router.post('/admin/activate', accountActivation );
router.post('/admin/signin', signin );
router.get('/admin/:id', findOneCargoAdmin);

module.exports = router;
