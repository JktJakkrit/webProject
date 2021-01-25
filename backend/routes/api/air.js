const router = require('express').Router();
const controller = require('../../controllers/air.controller')
const upload = require('../../configs/uploadpic');

// const multer = require('multer')
// const upload2 = multer().single('avatar');


router.get('/all', controller.GetAirAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostAir)

module.exports = router;