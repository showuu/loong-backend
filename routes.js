'use strict';

module.exports = (app) => {
    // 收藏品
    app.use('/collections', require('./apis/collection'))
    // 用户
    app.use('/users', require('./apis/user'))
    // 七牛
    app.use('/qiniu', require('./apis/qiniu'))
    // 404处理
    app.use((req, res, next) => {
        res.status(404).send("404 Not Found!")
        next()
    })
}