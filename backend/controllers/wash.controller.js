const service = require('../services/wash.service')

const methods = {
    async GetWashAll(req, res) {
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
    async PostWash(req, res) {
        try {
            let result = await service.postItemWash(req.file.path, req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async UpdateWashById(req, res) {
        try {
            let result = await service.putItemWashById(req.file.path, req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async DeleteWashById(req, res) {
        try {
            let result = await service.deleteItemWashById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }
}

module.exports = {...methods }