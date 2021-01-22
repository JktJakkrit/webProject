const service = require('../services/air.service')

const methods = {
    async GetAirAll(req,res) {
        try{
            let result = await service.findAll()
            res.status(200).send(result)
        }catch(error){
            res.status(404).json(error).end();
        }
    },
    async PostAir(req,res){
        try{
            let result = await service.postItemAir(req.body)
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
            console.log(error.message)
        }
    }
}

module.exports = {...methods}