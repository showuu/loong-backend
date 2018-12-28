'use strict';

const Collection = require('../models/collection')
const mongoose = require('mongoose')

module.exports = {
    async create(req, res) {
        const userId = req.body.userId && mongoose.Types.ObjectId(req.body.userId) || mongoose.Types.ObjectId('5c25077642a2a22114c4c7fa')
        const name = req.body.name
        const description = req.body.description
        const pics = req.body.pics || []
        const collection = await Collection.create({ user: userId, name, description, pics })
        console.log(collection.toJSON)
        res.send(collection.toJSON())
    },

    async query(req, res) {
        const state = req.query.state
        const keyWord = req.query.keyWord
        console.log(state, keyWord)
        const conditions = {};
        if (state && parseInt(state)) {
            conditions.state = state
        }
        if (keyWord) {
            conditions['$or'] = [{ name: new RegExp(keyWord.trim()) }, { id: new RegExp(keyWord.trim()) }]
        }
        console.log(conditions)
        const data = await Collection.find(conditions).populate('user').sort('-createdAt').exec()
        data.map(e => e.toJSON())

        res.send(data)
    }
}