const router = require('express').Router();
const controller = require('../../controllers/refri.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetRefriAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostRefri)
router.put('/id/:id', controller.UpdateRedriById)
router.delete('/id/:id', controller.DeleteRefriById)

module.exports = router;