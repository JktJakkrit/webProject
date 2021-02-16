const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");

const methods = {
    postProductType: function(body) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `type` SET ?';

            console.log(body);
            db.query(sql, body, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    },
    findAll: function() {
        return new Promise((resolve, reject) => {
            // db.connect(function(err){ console.log(err)});
            db.query("SELECT t.* , g.group_name , c.category_name FROM `type` t " +
                "LEFT JOIN `group` g ON g.group_sys_id = t.group_sys_id " +
                "LEFT JOIN `category` c ON c.category_sys_id = g.category_sys_id ",
                function(error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                });
            // db.end();
        });
    },


    findProductTypeById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `type` where `type_sys_id` = " + id;
            // db.connect();
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    },
    putItemProductTypeById: function(id, body) {
        return new Promise((resolve, reject) => {
            // let newPath = config.file + path.basename(path_pic)
            // let pic = { file: newPath };
            let data = [{...body }, id];
            // let sql = SqlString.format('UPDATE `manage-air` SET ?', data);
            // sql = sql + "where `air_sys_id` = " + id;
            let sql = "UPDATE `type` SET ? where `type_sys_id` = ?";
            db.query(sql, data, function(err, rows, fields) {
                if (err) return reject(err);
                return resolve(rows);
            })
        });
    },
    deleteItemProductTypeById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `type` WHERE `type_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            });
        });
    },

}
module.exports = {...methods };