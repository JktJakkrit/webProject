const express = require('express')
const config = require('./configs/app');
const app = express()  //เป็นการสร้าง instance ให้กับ express
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


//Express Configs
require('./configs/express')(app)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(config.port, () => {
    let port = server.address().port
    console.log(`Example app listening at  http://localhost:${port}`)
});