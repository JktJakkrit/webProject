const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `manage-other`', function(error, result, fields) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                //db.end();
        })
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-other` where `other_sys_id` = " + id;
            db.query(sql, function(error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                // db.end();
        })
    },
    postManageOther: function(path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { 'file': newPath }
            let data = {...body, ...pic }
            let sql = "INSERT INTO `manage-other` SET ?";
            // return resolve(data);
            db.query(sql, data, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        })
    },
    putManageOtherById: function(path_pic, id, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { file: newPath };
            let data = [{...body, ...pic }, id];
            // let sql = "UPDATE `manage-other` SET ? WHERE `other_sys_id` = ?";
            let sql = "UPDATE `manage-other` SET ? where other_sys_id = ?";
            db.query(sql, data, function(err, rows, fields) {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteItemFanById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `manage-other` WHERE `other_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            })
        })
    }
}

module.exports = {...methods }