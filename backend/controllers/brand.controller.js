const brandServices = require('../services/brand.service');

const methods = {

    async PostBrand(req, res) {
        try {
            let result = await brandServices.postBrand(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async GetBrandAll(req, res) {
        try {
            let result = await brandServices.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetBrandById(req, res) {
        try {
            let result = await brandServices.findById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async UpdateBrandById(req, res) {
        console.log(req.params.id, req.body);
        try {
            let result = await brandServices.putItemBrandById(req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async DeleteBrandById(req, res) {
        try {
            let result = await brandServices.deleteItemBrandById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }
}

module.exports = {...methods }