const service = require('../services/refri.service')

const methods = {
    async GetRefriAll(req,res) {
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
    async PostRefri(req,res){
        try{
            let result = await service.postItemRefri(req.file.path,req.body)
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
        }
    },
    async UpdateRedriById(req,res){
        try{
            let result = await service.putItemRefriById(req.params.id,req.body)
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
        }
    }
}

module.exports = {...methods}