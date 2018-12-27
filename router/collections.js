const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Collection = require('../models/collection')

router.get('/', async (req, res) => {
    const state = req.query.state
    const keyWord = req.query.keyWord
    const conditions = {};
    const options = {}
    if (state && parseInt(state)) {
        conditions.state = state
    }
    if (keyWord) {
        conditions.keyWord = new RegExp(keyWord)
    }
    const lists = await Collection.find(conditions, options).exec()
    // .toJson({virtuals:true})
    res.send(lists)
})

router.post('/', async (req, res) => {
    console.log(req.body)
    // const userId = req.body.userId && mongoose.Types.ObjectId(req.body.userId)
    const userId = req.body.userId
    const name = req.body.name
    const description = req.body.description
    const pics = req.body.pics || []
    const collection = await Collection.create({ userId, name, description, pics })

    res.send(collection)
})

// router.get('/admin')

module.exports = router