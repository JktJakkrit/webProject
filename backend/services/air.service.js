const db = require('../configs/database');

const medthods = {
    findAll(){
        return new Promise((resolve, reject)=>{
            db.query('SELECT * FROM `manage-air`',function(error,result,fields){
                if(error) return reject(error);
                return resolve(result);
            })
            db.end();
        })
    }
}

module.exports = {...medthods}