const service = require('../services/air.service')

const methods = {
    async GetAirAll(req, res) {
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
    async PostAir(req, res) {
        try {
            let result = await service.postItemAir(req.file.path, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async UpdateAirById(req, res) {
        try {
            let result = await service.putItemAirById(req.file.path, req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async DeleteAirById(req, res) {
        try {
            let result = await service.deleteItemAirById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }
}

module.exports = { ...methods }