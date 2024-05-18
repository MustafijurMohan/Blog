require('dotenv').config()
const mongoose = require('mongoose')
const URL = process.env.MONGO_URI


mongoose.connect(URL)
.then(() => {
    console.log(`Database Connection Successfull.`)
})
.catch((err) => {
    console.error(err)
})








