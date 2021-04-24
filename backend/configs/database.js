const config = require('../configs/app');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: config.hostname,
    user: config.username,
    password: config.password,
    database: config.database,
    multipleStatements: true
})

connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function(error, rows, fields) { if (error) throw error; });
// connection.pause();

module.exports = connection;