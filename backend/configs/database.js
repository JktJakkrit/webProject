const config = require('../configs/app');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host        : config.hostname,
    user        : config.username,
    password    : config.password,
    database    : config.database
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
if(err){
    console.log('The solution is: ', rows[0].solution)
    throw err    
}else{
    console.log(rows[0])
}
})
module.exports = connection;