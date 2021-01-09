const express = require('express')
const config = require('./configs/app');
const app = express()  //เป็นการสร้าง instance ให้กับ express
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



//Express Configs
require('./configs/express')(app)

// Middleware
// not yet

//Routes
app.use(require('./routes'))

//Error handler
//not yet

// SwaggerAPI

app.use('/api-docs', swaggerUi.serve , swaggerUi.setup(swaggerDocument));


// Start Server
const server = app.listen(config.port, () => {
    // @ts-ignore
    let port = server.address().port
    console.log(`Example app listening at  http://localhost:${port}`)
});