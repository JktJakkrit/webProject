const router = require('express').Router();
const controller = require('../../controllers/wash.controller')

router.get('/all', controller.GetWashAll)

module.exports = router;