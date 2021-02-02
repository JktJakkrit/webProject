const router = require('express').Router();
const controller = require('../../controllers/bill.controller')

router.post('/post',controller.PostBill)

module.exports = router;