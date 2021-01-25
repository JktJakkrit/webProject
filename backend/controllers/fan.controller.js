const service = require('../services/fan.service')

const methods = {
    async GetFanAll(req,res) {
        try{
            let result = await service.findAll()
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
        }
    },
    async GetById(req,res){
        try{
            let result = await service.findById(req.params.id)
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
        }
    },
    async PostFan(req,res){
        try{
            let result = await service.postItemFan(req.file.path,req.body)
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
        }
    }
}

module.exports = {...methods}