const router = require('express').Router();
const controller = require('../../controllers/product-type.controller')

router.post('/post', controller.PostProductType)

router.get('/all', controller.GetProductTypeAll)
router.get('/id/:id', controller.GetProductTypeById)
router.put('/edit/:id', controller.UpdateProductTypeById)
router.delete('/delete/:id', controller.DeleteProductTypeById)


module.exports = router;