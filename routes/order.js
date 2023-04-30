const express = require('express');
const router = express.Router()

//import controllers
const { OrderAdd, FindUserOrderAll, findCargoOrderGet, findOneOrder, OrderTypeUpdate, OrderUpdateImage, OrderFilter, OrderSearch, SearchOrderAdmin } = require('../controllers/order');

router.post('/order/add', OrderAdd );
router.post("/order/filter", OrderFilter)
router.get('/order/user/:id', FindUserOrderAll);
router.post('/order', findCargoOrderGet);
router.get('/order/detail/:id', findOneOrder);
router.post('/order/type/:id', OrderTypeUpdate);
router.post('/order/image/:id', OrderUpdateImage);
router.post('/order/search', SearchOrderAdmin);
router.get('/order/search/:id', OrderSearch);



module.exports = router;