const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./configs/config.local')

mongoose.connect('mongodb://itest.icoastline.cn:27017/PQM_PRO', { ...config.mongodb, useNewUrlParser: true })

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 路由
require('./routes')(app)

// 错误处理
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => console.log('App listening on port 3000!'))