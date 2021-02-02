const db = require('../configs/database');

const methods = {
    postBill: function (body) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `manage-air` SET ?';
            db.query(sql, body, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }
}


module.exports = { ...methods }