const router = require('express').Router();
const controller = require('../../controllers/dish.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetDishAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostDish)
router.put('/id/:id', controller.UpdateDishById)


module.exports = router;