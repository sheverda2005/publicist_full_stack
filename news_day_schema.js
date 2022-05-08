const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsDay = new Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    impotent: {
        type: String,
        require: true
    },
    autor: {
        type: Object,
        require: true
    },
    htmlPage: {
        type: String,
        require: true
    }
})

const NEWS_DAY = mongoose.model("news_day", newsDay)

module.exports = NEWS_DAY