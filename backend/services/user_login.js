const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    userLogin: function(id, body) {
        console.log(body);
        return new Promise((resolve, reject) => {
            const { username, password } = body;
            // let newPath = config.file + path.basename(path_pic)
            // let pic = { 'file': newPath }
            let data = [username, password];
            let sql = `SELECT * FROM register WHERE username = '${username}' AND password = '${password}'`;
            // return resolve(data);
            db.query(sql,[ username, password ], function(error, result) {
                if (error) return reject(error);
                
                // if (error) return error.status(404).send({ message: "User Not found." });
                return resolve(result[0]);
                // return resolve(result);
            });
            // db.end();
        })
    }, // post




}

module.exports = {...methods };