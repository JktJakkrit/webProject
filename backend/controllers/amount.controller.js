const service = require('../services/amount.service')

const methods = {
    async GetAmountAir(req, res) {
        try {
            let result = await service.amountAirTotal()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetAmountFan(req, res) {
        try {
            let result = await service.amountFanTotal()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetAmountTv(req, res) {
        try {
            let result = await service.amountTvTotal()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetAmountRefri(req, res) {
        try {
            let result = await service.amountRefriTotal()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetAmountDish(req, res) {
        try {
            let result = await service.amountDishTotal()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetAmountWash(req, res) {
        try {
            let result = await service.amountWashTotal()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetAmountOther(req, res) {
        try {
            let result = await service.amountOtherTotal()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = {...methods }