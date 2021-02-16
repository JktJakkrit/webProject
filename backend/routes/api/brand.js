const router = require('express').Router();
const controller = require('../../controllers/brand.controller')

router.post('/post', controller.PostBrand)
router.get('/all', controller.GetBrandAll)
router.get('/id/:id', controller.GetBrandById)
router.put('/edit/:id', controller.UpdateBrandById)
router.delete('/delete/:id', controller.DeleteBrandById)

module.exports = router;