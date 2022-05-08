const mongoose = require('mongoose')
const Schema = mongoose.Schema

const autorization = new Schema({
    email: {
        type: String,
        require: true, 
        unique: true
    },
    password: {
        type: String,
        require: true, 
        unique: false
    },
    useName: {
        type: String,
        require: true, 
        unique: false
    },
    surName: {
        type: String,
        require: true, 
        unique: false
    }
})
const Autorization = mongoose.model('autorizetion_redux', autorization)

module.exports = Autorization;