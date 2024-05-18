const express = require('express')
const router = express.Router()

const { register, login, UserUpdateByID, UserDeleteByID, FindUserByID } = require('../controllers/UserControllers')
const { PostCreate, UpdatePost, PostDeleteByID, FindPostByID, FindAllPost, uploadFile, uploadImage } = require('../controllers/PostControllers')
const { CreateCategory, getAllCategory } = require('../controllers/CategoryControllers')


// user api

router.post('/register', register)
router.post('/login', login)
router.post('/UserUpdateByID/:id', UserUpdateByID)
router.get('/FindUserByID/:id', FindUserByID)
router.delete('/UserDeleteByID/:id', UserDeleteByID)

// post api
router.post('/PostCreate', PostCreate)
router.post('/UpdatePost/:id', UpdatePost)
router.get('/FindPostByID/:id', FindPostByID)
router.get('/FindAllPost', FindAllPost)
router.delete('/PostDeleteByID/:id', PostDeleteByID)

router.post('/uploadImage', uploadImage)


// category api
router.post('/CreateCategory', CreateCategory)
router.get('/getAllCategory', getAllCategory)


module.exports = router



