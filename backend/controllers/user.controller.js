const service = require('../services/user.service')

const methods = {
    async onGetQuestion(req, res) {
        try {
            let result = await service.findById(req)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetById(req, res) {
        try {
            let result = await service.findUserById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async PostUser(req, res) {
        try {
            let result = await service.postAdminUser(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }
}


module.exports = {...methods }