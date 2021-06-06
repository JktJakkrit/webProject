const service = require('../services/admin_login.service')

const methods = {

    async adminLogin(req, res) {
        try {
            let result = await service.adminLogin(req.params.id, req.body)
            if(!result) {
                res.status(404).send('Error')
            }
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = {...methods }