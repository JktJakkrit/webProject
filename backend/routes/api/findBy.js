const router = require('express').Router();
const controller = require('../../controllers/findBy.controller')

router.post('/group', controller.CategoryfindGroup)
router.post('/type', controller.TypeByGroup)
router.post('/product', controller.ProductByType)
router.post('/some', controller.ProductByGroup)

router.get('/provinces', controller.GetAll)
router.post('/province', controller.DistrictsByProvinces)
router.post('/district', controller.SubdistrictsByDistricts)
router.post('/zipcode', controller.ZipCode)

module.exports = router;