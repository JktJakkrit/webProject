const router = require('express').Router();
const controller = require('../../controllers/user_login')

router.post('/login', controller.userLogin)
    // router.post('/login', controller.adminLogin)

module.exports = router;