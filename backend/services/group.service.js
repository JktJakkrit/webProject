const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");

const methods = {
    postGroup: function(path_pic, body) {
            return new Promise((resolve, reject) => {
                let newPath = config.file + path.basename(path_pic);
                let pic = { file: newPath };
                let data = {...body, ...pic };
                let sql = "INSERT INTO `group` SET ?";
                // return resolve(data);
                db.query(sql, data, function(error, result) {
    
                    if (error) return reject(error);
                    return resolve(result);
                });
                // db.end();
            });
        }, // post

    // postGroup: function(body) {
    //     return new Promise((resolve, reject) => {
    //         let sql = 'INSERT INTO `group` SET ?';

    //         console.log(body);
    //         db.query(sql, body, function(error, result) {
    //             if (error) return reject(error);
    //             return resolve(result);
    //         })
    //     })
    // },
    findAll: function() {
        return new Promise((resolve, reject) => {
            // db.connect(function(err){ console.log(err)});
            db.query("SELECT g.* , c.category_name  FROM `group` g LEFT JOIN `category` c ON c.category_sys_id = g.category_sys_id", function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `group` where `group_sys_id` = " + id;
            // db.connect();
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    },
    putItemGroupById: function(path_pic, id, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { file: newPath };
            let data = [{...body, ...pic }, id];
            // let sql = SqlString.format('UPDATE `manage-air` SET ?', data);
            // sql = sql + "where `air_sys_id` = " + id;
            let sql = "UPDATE `group` SET ? where `group_sys_id` = ?";
            db.query(sql, data, function(err, rows, fields) {
                if (err) return reject(err);
                return resolve(rows);
            })
        });
    },
    deleteItemGroupById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `group` WHERE `group_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            });
        });
    },

}
module.exports = {...methods };