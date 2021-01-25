const router = require('express').Router();
const controller = require('../../controllers/tv.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetTVAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostTV)
router.put('/id/:id', controller.UpdateTVById)

module.exports = router;