const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, trim: true, required: true },
    contactPhone: { type: String, trim: true, required: true },
}, { timestamps: true })


const User = mongoose.model('Loong.User', userSchema)

module.exports = User