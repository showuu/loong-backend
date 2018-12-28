'use strict'

const express = require('express')
const { create } = require('../controllers/user')

const router = express.Router()

// 新建用户
router.post('/', create)

module.exports = router