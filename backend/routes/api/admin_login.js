const router = require('express').Router();
const controller = require('../../controllers/admin_login.controller')


router.post('/login', controller.adminLogin)

module.exports = router;