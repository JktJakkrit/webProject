const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `manage-tv`', function(error, result, fields) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                //db.end();
        })
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-tv` where `tv_sys_id` = " + id;
            db.query(sql, function(error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                // db.end();
        })
    },
    postItemTV: function(path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { 'file': newPath }
            let data = {...body, ...pic }
            let sql = "INSERT INTO `manage-tv` SET ?";
            // return resolve(data);
            db.query(sql, data, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        })
    }, // post
    putItemTVById: function(path_pic, id, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { file: newPath };
            let data = [{...body, ...pic }, id];
            // let sql = "UPDATE `manage-tv` SET ? WHERE `tv_sys_id` = ?";
            let sql = "UPDATE `manage-tv` SET ? where tv_sys_id = ?";
            db.query(sql, data, function(err, rows, fields) {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteItemTVById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `manage-tv` WHERE `tv_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            })
        })
    }
}

module.exports = {...methods }