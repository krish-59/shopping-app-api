var express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./utils/swagger')

// swagger setup
const swaggerSpecs = swaggerJsDoc(options);

// creating an express app
var app = express();
const PORT = process.env.PORT || 3080;

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));



app.use('/api', routes)

app.listen(PORT, async ()=>{
    console.log(`express app running on port: ${PORT}`)
})

module.exports = app;
