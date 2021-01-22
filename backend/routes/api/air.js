const router = require('express').Router();
const controller = require('../../controllers/air.controller')

router.get('/all', controller.GetAirAll)
router.post('/post', controller.PostAir)

module.exports = router;