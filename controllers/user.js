'use strict';

const User = require('../models/user')

module.exports = {
    async create(req, res) {
        const name = req.body.name
        const contactPhone = req.body.contactPhone
        const user = await User.create({ name, contactPhone })

        res.send(user.toJSON())
    }
}