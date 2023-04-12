const express = require('express');
const router = express.Router()

//import controllers
const { OrderAdd, FindUserOrderAll, findCargoOrderGet, findOneOrder, OrderTypeUpdate, OrderUpdateImage } = require('../controllers/order');

router.post('/order/add', OrderAdd );
router.get('/order/user/:id', FindUserOrderAll);
router.get('/order/:id', findCargoOrderGet);
router.get('/order/detail/:id', findOneOrder)
router.post('/order/type/:id', OrderTypeUpdate);
router.post('/order/image/:id', OrderUpdateImage)

module.exports = router;