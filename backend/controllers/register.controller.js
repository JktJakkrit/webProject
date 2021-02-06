const service = require('../services/register.service')

const methods = {
    async GetRegisterAll(req, res) {
        try {
            let result = await service.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetById(req, res) {
        try {
            let result = await service.findById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async PostRegister(req, res) {
        try {
            let result = await service.postRegister(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = {...methods}