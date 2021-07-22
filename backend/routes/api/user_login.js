const router = require('express').Router();
const controller = require('../../controllers/user_login')

router.post('/login', controller.userLogin)
// router.post('/login1', controller.userLogin1)


module.exports = router;