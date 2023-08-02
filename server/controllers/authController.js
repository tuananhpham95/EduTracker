const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
    //RegisterForm
    registerUser: async (req, res) => {
        const {username, password} = req.body;
        try {
            //hashing password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            //check for existing user
            const user = await User.findOne({username});
            if (user) {
                return res
                    .status(400)
                    .json({success: false, message: "Username already exists"});
            }
            //create new user
            const newUser = await User.create({username, password: hashed});

            //return token
            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
            if (newUser) {
                res.status(200).json({
                    _id: newUser._id,
                    success: true,
                    message: "Your account has been created successfully.",
                    accessToken
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500)
        }
    },
    //login
    loginUser: async (req, res) => {
        const {username, password} = req.body
        if (!username || !password) return res.status(400).json({
            success: false,
            message: 'missing username or password'
        })
        try {
            //check for existing user
            const user = await User.findOne({username})
            if (!user) return res.status(400).json({success: false, message: 'incorrect username or password'})
            if (user && user.password) {
                const validPassword = await bcrypt.compare(password, user.password)
                if (!validPassword) return res.status(400).json({
                    success: false,
                    message: 'incorrect username or password'
                })
                const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({success: true, message: 'User logged in successfully', accessToken})
            }

        } catch (error) {
            console.log(error);
            res.status(500)
        }
    },
    //check if user is logged in
    checkUser: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password')
            if (!user) return res.status(400).json({success: false, message: 'User not found'})
            res.json({success: true, user})
        } catch (error) {
            console.log(error);
            res.status(500)
        }
    }

}

module.exports = authController;