const router = require('express').Router();
const controller = require('../../controllers/air.controller')

router.get('/all', controller.GetAirAll)

module.exports = router;