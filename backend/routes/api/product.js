const router = require('express').Router();
const controller = require('../../controllers/product.controller')
const upload = require('../../configs/uploadpic');

router.get('/all', controller.GetProductAll)
router.get('/id/:id', controller.GetById)
router.post('/post', upload.single('avatar'), controller.PostProduct)
router.put('/edit/:id', upload.single('avatar'), controller.UpdateProductById)
router.delete('/delete/:id', controller.DeleteProductById)

module.exports = router;