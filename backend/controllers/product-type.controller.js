const productTypeServices = require('../services/product-type.service');

const methods = {

    async PostProductType(req, res) {
        try {
            let result = await productTypeServices.postProductType(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },


    async GetProductTypeAll(req, res) {
        try {
            let result = await productTypeServices.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },


    async GetProductTypeById(req, res) {
        try {
            let result = await productTypeServices.findProductTypeById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async UpdateProductTypeById(req, res) {
        console.log(req.params.id, req.body);
        try {
            let result = await productTypeServices.putItemProductTypeById(req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async DeleteProductTypeById(req, res) {
        try {
            let result = await productTypeServices.deleteItemProductTypeById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }
}

module.exports = {...methods }