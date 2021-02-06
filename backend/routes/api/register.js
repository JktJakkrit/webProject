const router = require('express').Router();
const controller = require('../../controllers/register.controller')

router.get('/all', controller.GetRegisterAll)
router.get('/id/:id', controller.GetById)
router.post('/post', controller.PostRegister)

module.exports = router;