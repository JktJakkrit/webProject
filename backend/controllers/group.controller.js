const groupServices = require('../services/group.service');

const methods = {
    async PostGroup(req, res) {
        try {
            let result = await groupServices.postGroup(req.file.path, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async GetGroupAll(req, res) {
        try {
            let result = await groupServices.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async GetGroupById(req, res) {
        try {
            let result = await groupServices.findById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async GetGroupByIdCategory(req, res) {
        try {
            let result = await groupServices.findByIdCategory(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    

    async UpdateGroupById(req, res) {
        console.log(req.params.id, req.body);
        try {
            let result = await groupServices.putItemGroupById(req.file.path, req.params.id, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async DeleteGroupById(req, res) {
        try {
            let result = await groupServices.deleteItemGroupById(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    }
}

module.exports = {...methods }