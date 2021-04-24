const router = require('express').Router();
const controller = require('../../controllers/category.controller')
const upload = require('../../configs/uploadpic');

// router.post('/post', upload.single('avatar'), controller.PostCategory)
router.post('/post', controller.PostCategory)
router.get('/all', controller.GetCategoryAll)
router.get('/id/:id', controller.GetCategoryById)
router.put('/edit/:id', controller.UpdateCategoryById)
router.delete('/delete/:id', controller.DeleteCategoryById)

module.exports = router;