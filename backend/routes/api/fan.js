const router = require('express').Router();
const controller = require('../../controllers/fan.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetFanAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostFan)
router.put('/id/:id', controller.UpdateFanById)

module.exports = router;