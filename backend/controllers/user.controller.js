const service = require('../services/user.service')

const methods = {
    async onGetQuestion(req,res) {
        try{
            let result = await service.findById(req)
            res.success(result)
        }catch(error){
            res.error(error)
        }
    }
}

module.exports = {...methods}