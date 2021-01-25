const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `manage-refri`', function(error, result, fields) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-refri` where `refri_sys_id` = " + id;
            db.query(sql, function(error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                // db.end();
        })
    },
    postItemRefri: function(path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { 'file': newPath }
            let data = {...body, ...pic }
            let sql = "INSERT INTO `manage-refri` SET ?";
            // return resolve(data);
            db.query(sql, data, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        })
    }, // post
    putItemRefriById: function(id, body) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `manage-refri` SET ? WHERE `refri_sys_id` = " + id;
            db.query(sql, [body, id], function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }
}

module.exports = {...methods }