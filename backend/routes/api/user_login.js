const router = require('express').Router();
const controller = require('../../controllers/user_login')

router.post('/login', controller.userLogin)

module.exports = router;