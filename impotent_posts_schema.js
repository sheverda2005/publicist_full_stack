const mongoose = require('mongoose')
const Schema = mongoose.Schema

const impotentPosts = new Schema({
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

const IMPOTENT_POSTS = mongoose.model("impotent_posts", impotentPosts)

module.exports = IMPOTENT_POSTS