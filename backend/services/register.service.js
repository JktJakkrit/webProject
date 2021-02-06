const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `register`', function (error, result, fields) {
                if (error) return reject(error);
                return resolve(result);
            })
            //db.end();
        })
    },
    findById: function (id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `register` where `regis_sys_id` =  ?";
            db.query(sql,id, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            // db.end();
        })
    },
    postRegister: function (body) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `manage-refri` SET ?";
            // return resolve(data);
            db.query(sql, body, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        })
    },
}

module.exports = { ...methods }