const categoryServices = require('../services/category.service');

const methods = {

    async PostCategory(req, res) {
        try {
            let result = await categoryServices.postCategory(req.file.path, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async GetCategoryAll(req, res) {
        try {
            let result = await categoryServices.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetCategoryById(req, res) {
        try {
            let result = await categoryServices.findById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async UpdateCategoryById(req, res) {
        console.log(req.params.id, req.body);
        try {
            let result = await categoryServices.putItemCategoryById(req.file.path, req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async DeleteCategoryById(req, res) {
        try {
            let result = await categoryServices.deleteItemCategoryById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }
}

module.exports = {...methods }