const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll: function () {
        return new Promise((resolve, reject) => {
            // db.connect(function(err){ console.log(err)});
            db.query('SELECT * FROM `manage-air`', function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            // db.end();
        })
    },
    findById: function (id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-air` where `air_sys_id` = " + id;
            // db.connect();
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            // db.end();
        })
    },
    postItemAir: function (path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = {'file': newPath}
            let data = {...body, ...pic}
            let sql = "INSERT INTO `manage-air` SET ?";
            // return resolve(data);
            db.query(sql, data, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        })
    } // post
}

module.exports = {...methods}