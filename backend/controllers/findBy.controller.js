const { getProductByGroup } = require('../services/findBy.service');
const findByServices = require('../services/findBy.service');

const methods = {

    async CategoryfindGroup(req, res) {
        try {
            let result = await findByServices.getGroupByCategory(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async TypeByGroup(req, res) {
        try {
            let result = await findByServices.getTypeByGroup(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async ProductByType(req, res) {
        try {
            let result = await findByServices.getProductByType(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    async ProductByGroup(req, res) {
        try {
            let result = await findByServices.getProductByGroup(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

// ----------------------------------------

async GetAll(req, res) {
    try {
        let result = await findByServices.findAll()
        res.status(200).send(result)
    } catch (error) {
        res.json(error).end();
    }
},


    async DistrictsByProvinces(req, res) {
        try {
            let result = await findByServices.getDistrictsByProvinces(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async SubdistrictsByDistricts(req, res) {
        try {
            let result = await findByServices.getSubdistrictsByDistricts(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async ZipCode(req, res) {
        try {
            let result = await findByServices.getZipCodeBySubdistricts(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = {...methods }