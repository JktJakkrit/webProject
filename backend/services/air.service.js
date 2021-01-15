const db = require('../configs/database');
const split_data = require('../helpers/split_data_before_insert_db');
const medthods = {
    findAll: function (){
        return new Promise((resolve, reject)=>{
            db.query('SELECT * FROM `manage-air`',function(error,result){
                if(error) return reject(error);
                return resolve(result);
            })
            db.end();
        })
    },
    findById: function (id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM manage-air where air_sys_id = "+ id;
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            db.end();
        })
    },
    postItemAir:function(res) {
        return new Promise((resolve, reject) => {
            let {column ,data} = split_data(res);
            let sql = "SELECT * FROM manage-air where air_sys_id = " + id;
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            });
            db.end();
        })
    }
}

module.exports = {...medthods}