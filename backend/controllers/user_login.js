const { userLogin1 } = require('../services/user_login')
const service = require('../services/user_login')

const methods = {

    async userLogin(req, res) {
        try {
            let result = await service.userLogin(req.params.id, req.body)
            // let result = await service.userLogin(req.body)
            if(!result) {
                res.status(404).send('Error')
            }

            res.status(200).send(result)
        } catch (error) {
            res.json(error).end();
        }
    },
    
    // async userLogin1(req, res) {
    //     try {
    //         let result = await service.userLogin1(req.params.id, req.body)
    //         // let result = await service.userLogin(req.body)
    //         if(!result) {
    //             res.status(404).send('Error')
    //         }

    //         res.status(200).send(result)
    //     } catch (error) {
    //         res.json(error).end();
    //     }
    // },
    // async adminLogin(req, res) {
    //     try {
    //         let result = await service.adminLogin(req.params.id, req.body)
    //         res.status(200).send(result)
    //     } catch (error) {
    //         res.json(error).end();
    //     }
    // },

}

module.exports = {...methods }