const db = require('../configs/database');

const methods = {
    postBill: function(body) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `checkout` SET ?';

            console.log(body);
            db.query(sql, body, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }
}


module.exports = {...methods }