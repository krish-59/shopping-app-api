var express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

var app = express();
const PORT = process.env.PORT || 3080;

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));



app.use('/api', routes)
  

app.listen(PORT, ()=>{
    console.log(`express app running on port: ${PORT}`)
})

module.exports = app;
