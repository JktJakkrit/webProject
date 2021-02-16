const router = require('express').Router();
const controller = require('../../controllers/name_all.controller')


router.get('/all', controller.GetNameAll)


module.exports = router;