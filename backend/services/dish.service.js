const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `manage-dish`', function(error, result, fields) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                //db.end();
        })
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-dish` where `dish_sys_id` = " + id;
            db.query(sql, function(error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                // db.end();
        })
    },
    postItemDish: function(path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { 'file': newPath }
            let data = {...body, ...pic }
            let sql = "INSERT INTO `manage-dish` SET ?";
            // return resolve(data);
            db.query(sql, data, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        })
    }, // post
    putItemDishById: function(id, body) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `manage-dish` SET ? WHERE `dish_sys_id` = " + id;
            db.query(sql, [body, id], function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    },
    deleteItemDishById: function (id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `manage-dish` WHERE `dish_sys_id` = " + id;
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            })
        })
    }
}

module.exports = {...methods }