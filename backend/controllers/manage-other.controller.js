const service = require('../services/manage-other.service')

const methods = {
    async GetManageAll(req, res) {
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
    async PostManage(req, res) {
        try {
            let result = await service.postManageOther(req.file.path, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async UpdateManageById(req, res) {
        try {
            let result = await service.putManageOtherById(req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async DeleteManageOtherById(req, res) {
        try {
            let result = await service.deleteItemFanById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }

}

module.exports = {...methods}