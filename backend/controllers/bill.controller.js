const billServices = require('../services/bill.service');

const methods = {
    async PostBill(req, res) {
        try {
            let result = await billServices.postBill(req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

    async SaveFilePdf(req, res) {
        try {
            let result = await billServices.saveFilePdf(req.file.path, req.body)
            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },

}

module.exports = { ...methods }