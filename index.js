const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
require('dotenv').config()

app.use(cors())

//routes
var indexRouter = require('./routes/home');

app.use('/', indexRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))