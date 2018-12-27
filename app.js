const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const collections = require('./router/collections')

const app = express()

try {
    mongoose.connect('mongodb://itest.icoastline.cn:27017/loong', {
        user: 'owner',
        pass: 'owner_1a2b3c',
        useNewUrlParser: true
    })

    // mongoose.connect('mongodb://owner:owner_1a2b3c@itest.icoastline.cn:27017/loong')
} catch(e) {
    console.log(e)
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/collections', collections)


// 404处理
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
    next()
})

// 错误处理
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
try {

    app.listen(3000, () => console.log('App listening on port 3000!'))
} catch(e) {
    console.log(e)
}