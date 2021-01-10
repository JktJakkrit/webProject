const router = require('express').Router();

router.use('/users',require('./user'))
router.use('/air',require('./air'))
router.use('/dish',require('./dish'))
router.use('/fan',require('./fan'))
router.use('/refri',require('./refri'))
router.use('/tv',require('./tv'))
router.use('/wash',require('./wash'))
// ถ้ามีตัวอื่นอีกก็เอามาใส่


module.exports = router