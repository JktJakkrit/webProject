const router = require('express').Router();
const controller = require('../../controllers/bill.controller')
const upload = require('../../configs/uploadpic');

router.post('/post',controller.PostBill)


router.post('/savepdf', upload.single('avatar'), controller.SaveFilePdf)

module.exports = router;