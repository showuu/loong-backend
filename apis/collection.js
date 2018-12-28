'use strict'

const express = require('express')
const { create, query } = require('../controllers/collection')

const router = express.Router()

// 获取收藏品列表
router.get('/', query)

// 新建收藏品
router.post('/', create)

// router.get('/admin')

module.exports = router