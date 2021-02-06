const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll(req) {
        return new Promise(async(resolve, reject) => {
            db.query('SELECT * FROM admin_user', function(error, result, fields) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                //db.end();
        })
    },
    findUserById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `admin_user` where `admin_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    },

}
module.exports = {...methods };