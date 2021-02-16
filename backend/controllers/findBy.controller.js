const findByServices = require('../services/findBy.service');

const methods = {

    async CategoryfindGroup(req, res) {
        try {
            let result = await findByServices.getGroupByCategory(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async TypeByGroup(req, res) {
        try {
            let result = await findByServices.getTypeByGroup(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = {...methods }