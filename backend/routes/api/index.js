const router = require('express').Router();

router.use('/users',require('./user'))
// ถ้ามีตัวอื่นอีกก็เอามาใส่


module.exports = router