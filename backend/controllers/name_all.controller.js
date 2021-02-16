const service = require('../services/name_all.service')

const methods = {
    async GetNameAll(req, res) {
        try {
            let result = await service.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = {...methods }