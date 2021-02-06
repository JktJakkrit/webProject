const router = require('express').Router();
const controller = require('../../controllers/user.controller')

router.post('/login', controller.onGetQuestion)

module.exports = router;