const router = require('express').Router();


router.use('/login',require('./admin_user'))
router.use('/air',require('./air'))
router.use('/dish',require('./dish'))
router.use('/fan',require('./fan'))
router.use('/refri',require('./refri'))
router.use('/tv',require('./tv'))
router.use('/wash',require('./wash'))
router.use('/bill',require('./bill'))
router.use('/register',require('./register'))
router.use('/manager',require('./manage-other'))

// ถ้ามีตัวอื่นอีกก็เอามาใส่


module.exports = router