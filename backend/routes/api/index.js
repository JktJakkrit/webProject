const router = require('express').Router();


router.use('/login', require('./admin_user'))
router.use('/bill', require('./bill'))
router.use('/register', require('./register'))
router.use('/user_login', require('./user_login'))
router.use('/admin_login', require('./admin_login'))


router.use('/category', require('./category'))
router.use('/product', require('./product'))
router.use('/type', require('./product-type'))
router.use('/group', require('./group'))
router.use('/brand', require('./brand'))
router.use('/find', require('./findBy'))
    // ถ้ามีตัวอื่นอีกก็เอามาใส่


module.exports = router