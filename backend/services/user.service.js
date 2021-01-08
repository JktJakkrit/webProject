const db = require('../configs/database');
const method = {
    findById:function(req){
        return new Promise(async (resolve,reject)=>{
            db.connect();
            db.query('SELECT * FROM question',function(error,result,fields){
                if(error) return reject(error);
                return resolve(result[0]);
            })
            db.end();
        })
    }
}
module.exports ={...method};