const router = require('express').Router();
const controller = require('../../controllers/findBy.controller')

router.post('/group', controller.CategoryfindGroup)
router.post('/type', controller.TypeByGroup)
router.post('/product', controller.ProductByType)
router.post('/some', controller.ProductByGroup)

module.exports = router;