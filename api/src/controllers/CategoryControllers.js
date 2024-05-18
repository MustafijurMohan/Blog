const CategoryModel = require('../model/CategoryModel')

// Create Category
exports.CreateCategory = async (req, res) => {
    try {
        const reqBody = req.body
        const data = await CategoryModel.create(reqBody)
        res.status(201).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Successfull', data: error})
    }
}

// get All Category
exports.getAllCategory = async (req, res) => {
    try {
        const data = await CategoryModel.find()
        res.status(200).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}


