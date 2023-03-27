const express = require('express');
const { uploads, read } = require('../controllers/upload');
const router = express.Router()

router.post('/upload/image',uploads);
router.get('/haha/:file', read);

module.exports = router;