const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required'],
        validate: {
            validator:function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: 'Please Enter a Valid Email Address'
        }
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    profilePic: {
        type: String,
        default: ''
    }
}, {versionKey: false, timestamps: true})


// Hash the password
UserSchema.pre('save', async function (next) {
    const user = this
    if(!user.isModified('password')) {
        next()
    }
    try {
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password, saltRound)
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})

// compare the password
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel



