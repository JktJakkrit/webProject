const service = require('../services/dish.service')

const methods = {
    async GetDishAll(req,res) {
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
    async PostDish(req,res){
        try{
            let result = await service.postItemDish(req.file.path,req.body)
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
        }
    },
    async UpdateDishById(req,res){
        try{
            let result = await service.putItemDishById(req.params.id,req.body)
            res.status(200).send(result)
        }catch(error){
            res.json(error).end();
        }
    }
}

module.exports = {...methods}