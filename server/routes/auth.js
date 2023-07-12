const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const verifyToken = require('../middleWare/auth')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)

//check if user is logged in
router.get('/', verifyToken, authController.checkUser)

module.exports = router;