const service = require('../services/refri.service')

const methods = {
    async GetRefriAll(req,res) {
        try{
            let result = await service.findAll()
            res.status(200).send(result)
        }catch(error){
            res.status(404).json(error).end();
        }
    }
}

module.exports = {...methods}