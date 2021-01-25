const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
module.exports = async(app) => {

    // connect Mysql
    require('../configs/database')

    //CORS
    const allowedOrigins = []
    const corsOprions = {
        // origin: function (origin,callback) {
        //     if (!origin) return callback(null,true)
        //     if (allowedOrigins.indexOf(origin) === -1){
        //         const msg = 'The CORS policy for site does not ' + 'allow access from the specified Origin.'
        //         return callback(new Error(msg), false)
        //     }
        //     return callback(null,true)
        // }
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOprions))

    //Parser Body
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // Logger
    app.use(morgan('dev'))


    //Passport
    //TODO:ยังไม่ทำ Passport


    // Static file
    app.use('/static', express.static(path.join(__dirname, '../public')))


    //Custom Response Format
    //TODO:ยังไม่ทำ Custom Response Format
}