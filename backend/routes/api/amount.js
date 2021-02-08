const router = require('express').Router();
const controller = require('../../controllers/amount.controller')
const upload = require('../../configs/uploadpic');

router.get('/air', controller.GetAmountAir)
router.get('/dish', controller.GetAmountDish)
router.get('/fan', controller.GetAmountFan)
router.get('/refri', controller.GetAmountRefri)
router.get('/tv', controller.GetAmountTv)
router.get('/wash', controller.GetAmountWash)
router.get('/other', controller.GetAmountOther)

module.exports = router;