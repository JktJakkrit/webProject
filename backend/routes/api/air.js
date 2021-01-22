const router = require('express').Router();
const controller = require('../../controllers/air.controller')

router.get('/all', controller.GetAirAll)
router.get('/id/:id', controller.GetById)
router.post('/post', controller.PostAir)

module.exports = router;