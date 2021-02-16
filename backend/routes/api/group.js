const router = require('express').Router();
const controller = require('../../controllers/group.controller')

router.post('/post', controller.PostGroup)
router.get('/all', controller.GetGroupAll)
router.get('/id/:id', controller.GetGroupById)
router.put('/edit/:id', controller.UpdateGroupById)
router.delete('/delete/:id', controller.DeleteGroupById)

module.exports = router;