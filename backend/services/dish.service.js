const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");

const methods = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM `manage-dish`", function(error, result, fields) {
                if (error) return reject(error);
                return resolve(result);
            });
            //db.end();
        });
    },
    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-dish` where `dish_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    },
    postItemDish: function(path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic);
            let pic = { file: newPath };
            let data = {...body, ...pic };
            let sql = "INSERT INTO `manage-dish` SET ?";
            // return resolve(data);
            db.query(sql, data, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    }, // post
    putItemDishById: function(path_pic, id, body) {
        // console.log(path_pic);
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic);
            let pic = { file: newPath };
            let data = [{...body, ...pic }, id];
            // let sql = SqlString.format('UPDATE `manage-dish` SET ?', data);
            // sql = sql + "where `dish_sys_id` = " + id;
            let sql = "UPDATE `manage-dish` SET ? where dish_sys_id = ?";

            db.query(sql, data, function(err, rows, fields) {
                if (err) return reject(err);
                return resolve(rows);
            })
        });
    },
    deleteItemDishById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `manage-dish` WHERE `dish_sys_id` = " + id;
            db.query(sql, function(error, result) {
                if (error) return reject(error);
                return resolve("delete successfully");
            });
        });
    },
};

module.exports = {...methods };