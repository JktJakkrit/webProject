const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");

const methods = {
    postBrand: function(body) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `brand` SET ?';

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
            db.query("SELECT * FROM `brand`", function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `brand` where `brand_sys_id` = " + id;
            // db.connect();
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    },
    putItemBrandById: function(id, body) {
        return new Promise((resolve, reject) => {
            // let newPath = config.file + path.basename(path_pic)
            // let pic = { file: newPath };
            let data = [{...body }, id];
            // let sql = SqlString.format('UPDATE `manage-air` SET ?', data);
            // sql = sql + "where `air_sys_id` = " + id;
            let sql = "UPDATE `brand` SET ? where `brand_sys_id` = ?";
            db.query(sql, data, function(err, rows, fields) {
                if (err) return reject(err);
                return resolve(rows);
            })
        });
    },
    deleteItemBrandById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `brand` WHERE `brand_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            });
        });
    },

}
module.exports = {...methods };