const router = require('express').Router();
const controller = require('../../controllers/tv.controller')

router.get('/all', controller.GetTVAll)

module.exports = router;