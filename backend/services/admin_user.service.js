const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAuthen(username, password) {
        return new Promise(async (resolve, reject) => {
            const sql = 'SELECT * FROM webproject.`admin-user` where `username` = ? and `password` = ?';
            db.query(sql, [username, password], function (error, result, fields) {
                if (error) return reject(error);
                return resolve(result);
            })
            //db.end();
        })
    },

}
module.exports = { ...methods };