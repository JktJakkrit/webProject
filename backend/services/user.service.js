const db = require('../configs/database');
const method = {
    findById(req){
        return new Promise(async (resolve,reject)=>{
            db.query('SELECT * FROM question',function(error,result,fields){
                if(error) {return reject(error);}
                return resolve(result);
            })
        })
    }
}
module.exports ={...method};