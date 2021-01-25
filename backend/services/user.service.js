const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findById(req){
        return new Promise(async (resolve,reject)=>{
            db.query('SELECT * FROM question',function(error,result,fields){
                if(error) return reject(error);
                return resolve(result);
            })
            //db.end();
        })
    },
    findById: function (id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-air` where `admin_sys_id` = " + id;
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            // db.end();
        })
    },
}
module.exports ={...methods};