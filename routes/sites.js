const express = require('express');
const { SitesAdd, SitesAll, CountryAdd, CountryAll, cargoSitesUpdate } = require('../controllers/sitesAndCountry');
const router = express.Router()

router.post('/sites/add', SitesAdd);
router.get('/sites/all', SitesAll);

router.post('/country/add', CountryAdd)
router.get('/country/all', CountryAll)

router.patch('/sites/cargo/add/:id', cargoSitesUpdate)


module.exports = router;