const db = require("../configs/database");
const config = require("../configs/app");
const path = require("path");

// const methods = {
//     adminLogin: function(id, body) {
//         console.log(body);
//         return new Promise((resolve, reject) => {
//             const { username, password, status } = body;
//             // let newPath = config.file + path.basename(path_pic)
//             // let pic = { 'file': newPath }
//             let data = [username, password];
//             // let sql = `SELECT * FROM admin-user WHERE username = '${username}' AND password = '${password}' AND status = '${status}'`;
//             let sql = "SELECT * FROM `admin-user` WHERE username = '" + username + "' AND password = '" + password + "' AND status = '" + status + "'";
//             // return resolve(data);
//             db.query(sql, function(error, result) {
//                 if (error) return reject(error);
//                 return resolve(result[0]);
//             });
//             // db.end();
//         });
//     }, // post
// };


const methods = {
    adminLogin: function(id, body) {
        console.log(body);
        return new Promise((resolve, reject) => {
            const { username, password } = body;
            // let newPath = config.file + path.basename(path_pic)
            // let pic = { 'file': newPath }
            let data = [username, password];
            let sql = "SELECT * FROM `admin-user` WHERE `admin-user`.username = ? AND `admin-user`.password = ?";
            // let sql = "SELECT * FROM webproject.`admin-user` WHERE username = `username` AND password = `password`";
            // return resolve(data);
            db.query(sql,[ username, password ], function(error, result) {
                if (error) return reject(error);
                return resolve(result[0]);
                // return resolve(result);
            });
            // db.end();
        });
    }, // post
};


module.exports = {...methods };