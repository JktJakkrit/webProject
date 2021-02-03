const service = require('../services/admin_user.service')

const methods = {
    async GetLogin(req, res) {
        try {
            let result = await service.findAuthen(req.body.username, req.body.password)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = { ...methods }