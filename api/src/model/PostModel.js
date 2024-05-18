const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: [true, 'Title is required']
    },
    desc: {
        type: String,
        required: [true, 'Description is required']
    },
    photo: {
        type: String,
        required: false
    },
    categories: {
        type: Array,
        required: false
    }

}, {versionKey: false, timestamps: true})

const PostModel = mongoose.model('posts', PostSchema)
module.exports = PostModel