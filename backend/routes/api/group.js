const router = require('express').Router();
const controller = require('../../controllers/group.controller')
const upload = require('../../configs/uploadpic');

router.post('/post', upload.single('avatar'), controller.PostGroup)
// router.post('/post', controller.PostGroup)

router.get('/all', controller.GetGroupAll)
router.get('/id/:id', controller.GetGroupById)
router.put('/edit/:id', upload.single('avatar'), controller.UpdateGroupById)
router.delete('/delete/:id', controller.DeleteGroupById)

module.exports = router;