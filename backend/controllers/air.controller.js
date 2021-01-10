const service = require('../services/air.service')

const methods = {
    async GetAirAll(req,res) {
        try{
            let result = await service.findAll()
            res.status(200).send(result)
        }catch(error){
            res.status(404).json(error).end();
        }
    }
}

module.exports = {...methods}