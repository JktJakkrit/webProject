const router = require('express').Router();
const controller = require('../../controllers/refri.controller')

router.get('/all', controller.GetRefriAll)

module.exports = router;