const router = require('express').Router();
const controller = require('../../controllers/fan.controller')

router.get('/all', controller.GetFanAll)

module.exports = router;