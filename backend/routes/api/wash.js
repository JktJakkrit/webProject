const router = require('express').Router();
const controller = require('../../controllers/wash.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetWashAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostWash)

module.exports = router;