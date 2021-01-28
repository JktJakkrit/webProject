const router = require('express').Router();
const controller = require('../../controllers/air.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetAirAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostAir)
router.put('/id/:id', controller.UpdateAirById)
router.delete('/id/:id', controller.DeleteAirById)

module.exports = router;