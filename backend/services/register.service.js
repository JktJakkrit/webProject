const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    // findAll() {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT * FROM `register`', function(error, result, fields) {
    //                 if (error) return reject(error);
    //                 return resolve(result);
    //             })
    //             //db.end();
    //     })
    // },

    findAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT r.* , p.pname_in_thai , d.dname_in_thai, s.sname_in_thai FROM `register` r " +
            "LEFT JOIN `subdistricts` s ON s.id = r.sub " +
            "LEFT JOIN `districts` d ON d.id = s.district_id " +
            "LEFT JOIN `provinces` p ON p.id = d.province_id ",

            function(error, result, fields) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                //db.end();
        })
    },

    findById: function(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT r.* , p.pname_in_thai , d.dname_in_thai, s.sname_in_thai FROM `register` r " +
            "LEFT JOIN `subdistricts` s ON s.id = r.sub " +
            "LEFT JOIN `districts` d ON d.id = s.district_id " +
            "LEFT JOIN `provinces` p ON p.id = d.province_id " +
            "where `regis_sys_id` = "  + id;

            db.query(sql, id, function(error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                // db.end();
        })
    },
    postRegister: function(body) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `register` SET ?';

            console.log(body);
            db.query(sql, body, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }

}

module.exports = {...methods }