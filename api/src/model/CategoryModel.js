const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'name is required']
    },
    
}, {versionKey: false, timestamps: true})

const CategoryModel = mongoose.model('categories', CategorySchema)
module.exports = CategoryModel