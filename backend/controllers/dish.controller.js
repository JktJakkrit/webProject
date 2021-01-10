const service = require('../services/dish.service')

const methods = {
    async GetDishAll(req,res) {
        try{
            let result = await service.findAll()
            res.status(200).send(result)
        }catch(error){
            res.status(404).json(error).end();
        }
    }
}

module.exports = {...methods}