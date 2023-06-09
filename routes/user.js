const express = require('express');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();

const { read, update, adminMiddleware } = require('../controllers/user');

router.get('/user/:id',requireSignin, read);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router;