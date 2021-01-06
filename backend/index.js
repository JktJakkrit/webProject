const express = require('express')
const app = express()
const config = require('./configs/app');

//Express Configs
require('./configs/express')(app)



const server = app.listen( config.port, () => {
    //let host = server.address().address
    // @ts-ignore
    let port = server.address().port 
    //console.log(`Server is running at http://${host}:${port}`)
    console.log(`Example app listening at  http://localhost:${port}`)
    });