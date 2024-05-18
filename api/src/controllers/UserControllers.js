const UserModel = require('../model/UserModel')
const PostModel = require('../model/PostModel')
const bcrypt = require('bcryptjs')


// User Register api
exports.register = async(req, res) => {
    try {
        const {username, email, password} = req.body
        const userExits = await UserModel.findOne({email}) 

        if(userExits) {
            res.status(400).json({message: 'User already Exits.'})
        }

        const data = await UserModel.create({username, email, password})
        res.status(201).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// User Login api
// exports.login = async(req, res) => {

//     try {
//         const { email, password } = req.body
//         const userExits = await UserModel.findOne({email}) 

//         if(!userExits) {
//             res.status(400).json({message: 'Invalid Credentials.'})
//         }
//         const data = await userExits.comparePassword(password)

//         if(data) {
//             res.status(200).json({status: 'Successfull', data:userExits})
//         } else {
//             res.status(400).json({message: 'Invalid Email or Password.'})
//         }
        
//     } catch (error) {
//         res.status(400).json({status: 'Fail', data: error})
//     }
// }


// Login Alternative
exports.login = async (req, res) => {
    try {

        const user = await UserModel.findOne({username: req.body.username})
        !user && res.status(400).json({message: 'Wrong Credentials!'})

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json({message: 'Wrong Credentials!'})

        const {password, ...others} = user._doc
        res.status(200).json({status: 'Successfull', data: others})
        
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// Update User
exports.UserUpdateByID = async (req, res) => {
    const id = req.params.id
    if (req.body.userId === id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
            const data = await UserModel.findByIdAndUpdate(id, {$set: req.body}, {new: true})
            res.status(201).json({status: 'Successfull', data: data})
        } catch (error) {
            res.status(400).json({status: 'fail', data: error})
        }

    } else {
        res.status(401).json({status: 'You can update only your account!'})
    }
}

// Find User By ID
exports.FindUserByID = async (req, res) => {
    try {
        const id = req.params.id
        const data = await UserModel.findById(id)
        const {password, ...others} = data._doc
        res.status(200).json({status: 'Successfull', data: others})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}


// Delete User
exports.UserDeleteByID = async (req, res) => {
    const id = req.params.id
    if (req.body.userId === id) {
        try {
            const user = await UserModel.findById(id)
            try {
                await PostModel.deleteMany({username: user.username})
                await UserModel.findByIdAndDelete(id)
                res.status(200).json({status: 'User has been Deleted...'})
            } catch (error) {
                res.status(400).json({status: 'Fail', data: error})
            }
        } catch (error) {
            res.status(404).json({status: 'User not found!'})
        }

    } else {
        res.status(401).json({status: 'You can delete only your account!'})
    }
}