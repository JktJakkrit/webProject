const router = require('express').Router();
const controller = require('../../controllers/refri.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetRefriAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostRefri)

module.exports = router;