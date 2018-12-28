'use strict'

const express = require('express')
const { getToken } = require('../controllers/qiniu')

const router = express.Router()

// 获取七牛上传凭证
router.get('/token', getToken)

module.exports = router