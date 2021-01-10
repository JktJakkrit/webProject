const service = require('../services/fan.service')

const methods = {
    async GetFanAll(req,res) {
        try{
            let result = await service.findAll()
            res.status(200).send(result)
        }catch(error){
            res.status(404).json(error).end();
        }
    }
}

module.exports = {...methods}