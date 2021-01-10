const service = require('../services/wash.service')

const methods = {
    async GetWashAll(req,res) {
        try{
            let result = await service.findAll()
            res.status(200).send(result)
        }catch(error){
            res.status(404).json(error).end();
        }
    }
}

module.exports = {...methods}