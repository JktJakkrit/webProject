const db = require('../configs/database');

const methods = {
    postBill: function(body) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `checkout` SET ?';

            console.log(body);
            db.query(sql, body, function(error, result) {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    },

    saveFilePdf: function(path_pic, body) {
        return new Promise((resolve, reject) => {
            let newPath = config.file + path.basename(path_pic);
            let pic = { file: newPath };
            let data = {...body, ...pic };
            let sql = "INSERT INTO `filepdf` SET ?";
            // return resolve(data);
            db.query(sql, data, function(error, result) {

                if (error) return reject(error);
                return resolve(result);
            });
            // db.end();
        });
    }, // post


}




module.exports = {...methods }