const service = require('../services/user.service')

const methods = {
    async onGetQuestion(req,res) {
        try{
            let result = await service.findById(req)
            res.send(result)
        }catch(error){
            res.status(404).json(error).end();
        }
    }
}

module.exports = {...methods}