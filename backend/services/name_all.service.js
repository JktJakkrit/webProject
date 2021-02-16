const db = require('../configs/database');
const config = require('../configs/app');
const path = require('path');

const methods = {
    findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT name FROM `manage-air` UNION SELECT name FROM `manage-dish` UNION SELECT name FROM `manage-fan` UNION SELECT name FROM `manage-wash` UNION SELECT name FROM `manage-dish` UNION SELECT name FROM `manage-refri` UNION SELECT name FROM `manage-other`', function(error, result, fields) {
                    if (error) return reject(error);
                    return resolve(result);
                })
                //db.end();
        })
    },
}

module.exports = {...methods }