const service = require('../services/user_login')

const methods = {

    async userLogin(req, res) {
        try {
            let result = await service.userLogin(req.params.id, req.body)
            res.status(200).send(result)    
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = {...methods }