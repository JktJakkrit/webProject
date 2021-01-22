const db = require('../configs/database');

const medthods = {
    findAll(){
        return new Promise((resolve, reject)=>{
            db.query('SELECT * FROM `manage-tv`',function(error,result,fields){
                if(error) return reject(error);
                return resolve(result);
            })
            db.end();
        })
    },
    findById: function (id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `manage-tv` where `tv_sys_id` = " + id;
            db.query(sql, function (error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
            // db.end();
        })
    },
}

module.exports = {...medthods}