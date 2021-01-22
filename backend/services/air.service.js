const db = require('../configs/database');
const sep = require('../helpers/pre_model');
const methods = {
    findAll: function () {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `manage-air`', function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            db.end();
        })
    },
    findById: function (id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM manage-air where air_sys_id = " + id;
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            db.end();
        })
    },
    // TODO : ยังไม่ลองทดสอบ
    postItemAir: function (res) {
        return new Promise((resolve, reject) => {
            let {column, data} = sep.create(res);
            let sql = "INSERT INTO `manage-air` (" + column + ")" + "VALUES (" + data + ")";
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            db.end();
        })
    }
}

module.exports = {...methods}