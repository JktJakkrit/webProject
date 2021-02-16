const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");
const SqlString = require('sqlstring');

const methods = {
    findAll: function() {
        return new Promise((resolve, reject) => {
            // db.connect(function(err){ console.log(err)});
            db.query("SELECT p.* , g.group_name , c.category_name, t.type_name ,b.brand_name FROM `product` p " +
                "LEFT JOIN `type` t ON t.type_sys_id = p.type_sys_id " +
                "LEFT JOIN `group` g ON g.group_sys_id = t.group_sys_id " +
                "LEFT JOIN `category` c ON c.category_sys_id = g.category_sys_id " +
                "LEFT JOIN `brand` b ON b.brand_sys_id = p.brand_sys_id",
                function(error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                });
            // db.end();
        });
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `product` where `product_sys_id` = " + id;
            // db.connect();
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    },
    postItemProduct: function(path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic);
            let pic = { file: newPath };
            let data = {...body, ...pic };
            let sql = "INSERT INTO `product` SET ?";
            // return resolve(data);
            db.query(sql, data, function(error, result) {

                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    }, // post
    putItemProductById: function(path_pic, id, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic)
            let pic = { file: newPath };
            let data = [{...body, ...pic }, id];
            // let sql = SqlString.format('UPDATE `manage-air` SET ?', data);
            // sql = sql + "where `air_sys_id` = " + id;
            let sql = "UPDATE `product` SET ? where product_sys_id = ?";
            db.query(sql, data, function(err, rows, fields) {
                if (err) return reject(err);
                return resolve(rows);
            })
        });
    },
    deleteItemProductById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `product` WHERE `product_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            });
        });
    },
};

module.exports = {...methods };