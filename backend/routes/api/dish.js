const router = require('express').Router();
const controller = require('../../controllers/dish.controller')

router.get('/all', controller.GetDishAll)

module.exports = router;