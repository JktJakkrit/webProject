const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");

const methods = {


    getGroupByCategory: function(body) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT g.* FROM `group` g INNER JOIN `category` c ON g.category_sys_id = c.category_sys_id where c.category_sys_id = ?";
            console.log("======================");
            console.log(body.category_sys_id);
            console.log("======================");
            db.query(sql, body.category_sys_id, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    },
    getTypeByGroup: function(body) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT t.* FROM `type` t INNER JOIN `group` g ON t.group_sys_id = g.group_sys_id where g.group_sys_id = ?";
            console.log("======================");
            console.log(body.group_sys_id);
            console.log("======================");
            db.query(sql, body.group_sys_id, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    },

}
module.exports = {...methods };