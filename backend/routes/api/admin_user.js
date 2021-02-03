const router = require('express').Router();
const controller = require('../../controllers/admin_user.controller')

router.get('/', controller.GetLogin)

module.exports = router;