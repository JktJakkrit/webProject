const router = require('express').Router();
const controller = require('../../controllers/other.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetManageAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostManage)
router.put('/id/:id', upload.single('avatar'), controller.UpdateManageById)
router.delete('/id/:id', controller.DeleteManageOtherById)

module.exports = router;