const router = require('express').Router();

router.use('/users',require('./user'))
router.use('/air',require('./air'))
// ถ้ามีตัวอื่นอีกก็เอามาใส่


module.exports = router